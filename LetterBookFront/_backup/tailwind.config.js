/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}", // Added layout
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pontano)', 'sans-serif'],
        nav: ['var(--font-abeezee)', 'sans-serif'],
      },
      colors: {
        background: '#14181C', // Design spec
        surface: '#556677',    // Card background from spec (or #2c3440 if that was preferred, but spec says #556677 for book card frame)
        primary: '#00E054',    // Design spec
        text: {
          main: '#FFFFFF',
          secondary: '#BBCCDD', // Design spec
        },
        border: '#282828'
      },
    },
  },
  plugins: [],
}