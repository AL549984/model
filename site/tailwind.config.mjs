/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#050505",
          bg2: "#090909",
          surface: "rgba(7, 7, 7, 0.82)",
          border: "rgba(244, 241, 234, 0.18)",
          cyan: "#FF3B4E",
          blue: "#F4F1EA",
          violet: "#A8A29A",
          magenta: "#FF3B4E",
          emerald: "#F4F1EA",
          amber: "#A8A29A",
          rose: "#FF3B4E"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 36px rgba(255, 59, 78, 0.16)"
      }
    }
  },
  plugins: []
};
