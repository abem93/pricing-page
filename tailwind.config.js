/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts, scss}",],
  theme: {
    extend: {
      colors: {
        'cloudpano-aqua': 'rgb(89, 193, 201)',
        'cloudpano-green': '#47ce90',
        'cloudpano-blue': '#4c93ec',
        'middle-blue': 'rgb(69,119,206)'
      },
    },
    plugins: [],
  }
}
