import { logger, schedules } from "@trigger.dev/sdk";
import { Client, type ConnectConfig } from "ssh2";

const DEFAULT_ATLAS_REMOTE_COMMAND =
  "cd /home/ubuntu/.hermes/data/model_atlas_repo/site && bash scripts/model_atlas_auto_pipeline.sh";
const DEFAULT_ATLAS_POLL_COMMAND =
  "cd /home/ubuntu/.hermes/data/model_atlas_repo/site && bash scripts/model_atlas_case_poll_once.sh";

type RemoteSyncResult = {
  status: "remote_synced";
  host: string;
  command: string;
  exitCode?: number | null;
  stdoutTail?: string;
  stderrTail?: string;
};

type SkippedResult = {
  status: "skipped";
  reason: string;
};

type AtlasRemoteConfig = {
  host: string;
  username: string;
  port: number;
  password?: string;
  privateKey?: string;
  command: string;
  timeoutMs: number;
};

export const syncModelAtlas = schedules.task({
  id: "sync-model-atlas",
  cron: {
    pattern: process.env.MODEL_ATLAS_CRON ?? "0 */6 * * *",
    timezone: process.env.MODEL_ATLAS_TIMEZONE ?? "Asia/Shanghai",
    environments: ["PRODUCTION"],
  },
  run: async (payload): Promise<RemoteSyncResult | SkippedResult> => {
    logger.info("Starting Model Atlas remote sync", {
      scheduledAt: payload.timestamp,
      timezone: payload.timezone,
    });

    const hermesRemote = getAtlasRemoteConfig();
    if (!hermesRemote) {
      return {
        status: "skipped",
        reason: "Atlas Hermes SSH is not configured.",
      };
    }
    return runAtlasRemoteSync(hermesRemote);
  },
});

export const pollModelAtlasCases = schedules.task({
  id: "poll-model-atlas-cases",
  cron: {
    pattern: process.env.MODEL_ATLAS_POLL_CRON ?? "*/30 * * * *",
    timezone: process.env.MODEL_ATLAS_TIMEZONE ?? "Asia/Shanghai",
    environments: ["PRODUCTION"],
  },
  run: async (payload): Promise<RemoteSyncResult | SkippedResult> => {
    logger.info("Polling Model Atlas cases through Hermes", {
      scheduledAt: payload.timestamp,
      timezone: payload.timezone,
    });

    const hermesRemote = getAtlasRemoteConfig({
      command: process.env.MODEL_ATLAS_REMOTE_POLL_COMMAND?.trim() || DEFAULT_ATLAS_POLL_COMMAND,
      timeoutMs: parseInteger(process.env.MODEL_ATLAS_POLL_TIMEOUT_MS, 20 * 60 * 1000),
    });
    if (!hermesRemote) {
      return {
        status: "skipped",
        reason: "Atlas Hermes SSH is not configured.",
      };
    }
    return runAtlasRemoteSync(hermesRemote);
  },
});

function getAtlasRemoteConfig(
  overrides: Partial<Pick<AtlasRemoteConfig, "command" | "timeoutMs">> = {}
): AtlasRemoteConfig | null {
  const host = process.env.MODEL_ATLAS_HERMES_SSH_HOST?.trim() || process.env.HERMES_SSH_HOST?.trim();
  if (!host) return null;

  const password = process.env.MODEL_ATLAS_HERMES_SSH_PASSWORD || process.env.HERMES_SSH_PASSWORD;
  const privateKey = process.env.MODEL_ATLAS_HERMES_SSH_PRIVATE_KEY || process.env.HERMES_SSH_PRIVATE_KEY;
  if (!password && !privateKey) {
    logger.warn("Atlas Hermes SSH host is set, but neither password nor private key is configured");
    return null;
  }

  return {
    host,
    username: process.env.MODEL_ATLAS_HERMES_SSH_USER?.trim() || process.env.HERMES_SSH_USER?.trim() || "ubuntu",
    port: parseInteger(process.env.MODEL_ATLAS_HERMES_SSH_PORT || process.env.HERMES_SSH_PORT, 22),
    password,
    privateKey,
    command: overrides.command ?? process.env.MODEL_ATLAS_REMOTE_COMMAND?.trim() ?? DEFAULT_ATLAS_REMOTE_COMMAND,
    timeoutMs: overrides.timeoutMs ?? parseInteger(process.env.MODEL_ATLAS_SSH_TIMEOUT_MS, 30 * 60 * 1000),
  };
}

function runAtlasRemoteSync(config: AtlasRemoteConfig): Promise<RemoteSyncResult> {
  logger.info("Running Model Atlas sync on Hermes over SSH", {
    host: config.host,
    username: config.username,
    port: config.port,
    command: config.command,
  });

  return new Promise((resolve, reject) => {
    const conn = new Client();
    let settled = false;
    let stdout = "";
    let stderr = "";

    const settle = <T>(fn: (value: T) => void, value: T) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      conn.end();
      fn(value);
    };

    const timeout = setTimeout(() => {
      settle(reject, new Error(`Model Atlas remote sync timed out after ${config.timeoutMs}ms`));
    }, config.timeoutMs);

    const connectConfig: ConnectConfig = {
      host: config.host,
      port: config.port,
      username: config.username,
      readyTimeout: Math.min(config.timeoutMs, 60_000),
    };
    if (config.password) connectConfig.password = config.password;
    if (config.privateKey) connectConfig.privateKey = config.privateKey;

    conn
      .on("ready", () => {
        conn.exec(config.command, (error, stream) => {
          if (error) {
            settle(reject, error);
            return;
          }

          stream
            .on("close", (code: number | null, signal: string | null) => {
              const stdoutTail = tail(stdout);
              const stderrTail = tail(stderr);
              logger.info("Model Atlas remote sync finished", {
                host: config.host,
                exitCode: code,
                signal,
                stdoutTail,
                stderrTail,
              });

              if (code !== 0 && code !== null) {
                settle(
                  reject,
                  new Error(`Model Atlas remote sync failed with exit code ${code}: ${tail(stderr || stdout, 1200)}`)
                );
                return;
              }

              settle(resolve, {
                status: "remote_synced",
                host: config.host,
                command: config.command,
                exitCode: code,
                stdoutTail,
                stderrTail,
              });
            })
            .on("data", (data: Buffer) => {
              stdout += data.toString("utf8");
            });

          stream.stderr.on("data", (data: Buffer) => {
            stderr += data.toString("utf8");
          });
        });
      })
      .on("error", (error) => {
        settle(reject, error);
      })
      .connect(connectConfig);
  });
}

function parseInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function tail(value: string, maxLength = 8000) {
  return value.length <= maxLength ? value : value.slice(-maxLength);
}
