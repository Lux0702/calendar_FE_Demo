/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#5684AE',
        darkBlue: '#0F4C81',
        lightOrange: '#FFE4C8',
        darkOrange: '#F9BE81',
        calendarTile: '#E4F6ED',
      },
      borderRadius: {
        'custom': '20px',
      },
    },
  },
  plugins: [],
}


