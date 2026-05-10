import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffaf4",
          100: "#f6efe5",
          200: "#eadfce",
        },
        coral: {
          50: "#fff1ed",
          100: "#ffe0d7",
          200: "#f6b4a9",
          600: "#e35b46",
          700: "#d74735",
          800: "#b93429",
        },
        sage: {
          100: "#dce8dc",
          900: "#24382b",
        },
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["PlayfairDisplay", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(40, 32, 26, 0.12)",
      },
    },
  },
  plugins: [],
}
export default config
