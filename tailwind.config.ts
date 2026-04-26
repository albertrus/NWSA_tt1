import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "sc-orange": "#FF5500",
        surface: "#1a1a1a",
        "surface-elevated": "#222222",
        "surface-hover": "#2a2a2a",
      },
    },
  },
  plugins: [],
};
export default config;
