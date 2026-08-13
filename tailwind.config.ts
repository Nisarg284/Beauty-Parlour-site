import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1E17",
        emerald: {
          DEFAULT: "#12463A",
          bright: "#1F6E52",
          deep: "#082018",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#EAD7A0",
          foil: "#B8862F",
        },
        ivory: "#F7F3E8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "grain": "url('/images/grain.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
