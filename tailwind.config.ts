import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEF2F8",
          100: "#D2DEEC",
          200: "#A6BDD9",
          300: "#7999C4",
          400: "#4A70A3",
          500: "#0A3161",
          600: "#082850",
          700: "#061E3D",
          800: "#04142A",
          900: "#020A15",
        },
        accent: {
          50: "#FDF0F2",
          100: "#FBDCE1",
          200: "#F5AEB9",
          300: "#EC7D8E",
          400: "#DC4A62",
          500: "#B31942",
          600: "#8F1435",
          700: "#6B0F28",
        },
        silver: {
          50: "#FAFAFA",
          100: "#F2F2F3",
          200: "#E4E4E7",
          300: "#C7C7CC",
          400: "#A6A6AD",
          500: "#8B8B93",
        },
        soft: "#FCFCFD",
        surface: "#F2F4F7",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["13px", "18px"],
        sm: ["15px", "22px"],
        base: ["16px", "24px"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(2, 10, 21, 0.10)",
        "card-lg": "0 8px 30px rgba(2, 10, 21, 0.16)",
        nav: "0 -2px 16px rgba(2, 10, 21, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
