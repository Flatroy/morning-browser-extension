/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{index,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
        colors: {
          morning: {
            500: 'rgba(13, 172, 129, 1)',
            700: 'rgba(25, 190, 150, 1)',
          }
        }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
