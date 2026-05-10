import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf8",
          100: "#f8f1e7",
          200: "#eadccd",
        },
        coral: {
          50: "#fff2ef",
          100: "#ffe2dc",
          200: "#f5b7aa",
          600: "#e54c3b",
          700: "#cf3428",
          800: "#a72720",
        },
        sage: {
          50: "#f2f6ef",
          100: "#dbe8d3",
          700: "#60724f",
          900: "#26351f",
        },
        ink: {
          900: "#15110f",
          800: "#231c19",
        },
        skywash: {
          100: "#dbe8ec",
          700: "#466a75",
        },
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["PlayfairDisplay", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(32, 23, 18, 0.10)",
        lift: "0 28px 80px rgba(32, 23, 18, 0.16)",
      },
    },
  },
  plugins: [],
}
export default config
