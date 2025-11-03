import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neonGreen: {
          DEFAULT: '#00ff00',
          300: '#66ff66',
          500: '#00ff00',
          700: '#00cc00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
