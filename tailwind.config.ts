/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e', // Deep Blue/Black
        secondary: '#f5e6ca', // Cream/Gold
        accent: '#e84393', // Vibrant Pink/Magenta
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Cormorant Garamond', 'serif'],
      },
      animation: {
        'confetti-slow': 'confetti 10s linear 1',
        'pulse-glow-accent': 'pulse-glow 3s infinite ease-in-out',
      }
    },
  },
  plugins: [],
};