/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts, scss}",],
  theme: {
    extend: {
      colors: {
        'cloudpano-blue': 'rgb(89, 193, 201)',
        'background-blue': 'rgb(61,126,230)',
        'middle-blue': 'rgb(18,134,251)'
      },
    },
    plugins: [],
  }
}
