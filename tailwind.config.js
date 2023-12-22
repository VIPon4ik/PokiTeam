/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f2f2f2',
        textBlack: '#18171d',
        textSub: '#747280',
        purple: '#5130ca',
        error: '#f87172',
        borderGray: '#e0dfe5',
      }
    },
  },
  plugins: [],
}

