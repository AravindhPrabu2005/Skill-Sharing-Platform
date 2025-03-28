/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
        'space':['Space Grotesk','sans-serif']
      },
      colors:{
        'primary':'#7A1CAC',
      }
    
    },
  },
  plugins: [],
}