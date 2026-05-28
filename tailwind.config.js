/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#07111d',
        'bg-2': '#0d1b2a',
        'bg-3': '#111f30',
        green: { DEFAULT: '#00c851', light: '#00e85f', dark: '#009938' },
        gold: { DEFAULT: '#ffbb33', light: '#ffd166', dark: '#e6a000' },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
