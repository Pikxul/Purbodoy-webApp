import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🌊 Travel Brand Palette */
        primary: {
          DEFAULT: "#0ea5a4", // ocean teal
          hover: "#0d9488",
        },
        accent: {
          DEFAULT: "#f59e0b", // sun / adventure
          soft: "#fef3c7",
        },
        success: "#10b981",
        danger: "#ef4444",

        /* 🧱 Surfaces */
        surface: "#f8fafc",
        border: "#e5e7eb",

        /* 📝 Text */
        muted: "#64748b",
      },
    },
  },
  plugins: [],
};

export default config;
