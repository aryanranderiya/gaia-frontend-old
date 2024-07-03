import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#00bbff",
              foreground: "#000000",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#00bbff",
              foreground: "#000000",
            },
          },
        },
      },
    }),
  ],
};
