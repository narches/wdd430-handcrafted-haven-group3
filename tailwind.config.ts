import type { Config } from "tailwindcss";

export default {
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
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '1920px', // Updates the 7xl to be 100rem (1600px)
      },
    },
  },
  plugins: [],
} satisfies Config;
