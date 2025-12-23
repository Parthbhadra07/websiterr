/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        dmSans: ['DM Sans', 'sans-serif'],
        mozilla: ['Mozilla Text', 'serif'],
        samarkan: ['Samarkan', 'cursive', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        beige: {
          DEFAULT: '#C6AC8F',
          light: '#E8D9C7',
          dark: '#A68B6F',
        },
        secondary: "#D4C4B0",
        accent: "#C6AC8F",
        danger: "#EF4444",
        success: "#22C55E",
        muted: "#8B7A6B",
        white: "#ffffff",
        black: "#000000",
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
    },
  },
  plugins: [],
}
