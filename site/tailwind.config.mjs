/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#050816",
          bg2: "#070B18",
          surface: "rgba(15, 23, 42, 0.72)",
          border: "rgba(148, 163, 184, 0.18)",
          cyan: "#22D3EE",
          blue: "#38BDF8",
          violet: "#8B5CF6",
          magenta: "#E879F9",
          emerald: "#34D399",
          amber: "#FBBF24",
          rose: "#FB7185"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 36px rgba(34, 211, 238, 0.16)"
      }
    }
  },
  plugins: []
};
