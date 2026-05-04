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
        // Primary Colors
        "electric-blue": "#1E88E5",
        "electric-blue-dark": "#1565C0",
        "hi-orange": "#FF5722",
        "hi-orange-dark": "#F4511E",
        "charcoal": "#1A1A1D",
        "charcoal-elevated": "#2D2D30",
        "charcoal-hover": "#3A3A3D",
        "steel-gray": "#4A5568",
        "steel-gray-light": "#546E7A",
        // Accent Colors
        "neon-green": "#00FF88",
        "neon-green-dark": "#00e07a",
        "warn-yellow": "#FFD700",
        // Surface aliases
        surface: "#2D2D30",
        "surface-elevated": "#2D2D30",
        "surface-hover": "#3A3A3D",
      },
    },
  },
  plugins: [],
};
export default config;
