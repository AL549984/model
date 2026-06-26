import { defineConfig } from "@trigger.dev/sdk";

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_model_atlas",
  runtime: "node",
  logLevel: "log",
  maxDuration: 1800,
  dirs: ["./trigger"],
});
