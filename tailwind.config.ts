import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Cabinet Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#fff1f8",
          100: "#ffe4f3",
          200: "#ffc9e8",
          300: "#ff9dd2",
          400: "#ff5fb3",
          500: "#ff2d94",
          600: "#f0006f",
          700: "#d10060",
          800: "#ad0050",
          900: "#8f0044",
        },
        surface: {
          0: "#0a0a0f",
          1: "#111118",
          2: "#18181f",
          3: "#222230",
          4: "#2e2e40",
        },
        accent: {
          purple: "#9b5de5",
          pink: "#f72585",
          orange: "#fb5607",
          yellow: "#ffbe0b",
          cyan: "#00bbf9",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #f72585 0%, #9b5de5 50%, #00bbf9 100%)",
        "gradient-glow": "radial-gradient(ellipse at center, rgba(247,37,133,0.15) 0%, transparent 70%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, #f72585 0px, transparent 50%), radial-gradient(at 80% 0%, #9b5de5 0px, transparent 50%), radial-gradient(at 0% 50%, #00bbf9 0px, transparent 50%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
