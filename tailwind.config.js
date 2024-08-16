/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts, scss}",],
  theme: {
    extend: {
      colors: {
        'cloudpano-blue-green': 'rgb(89, 193, 201)',
        'cloudpano-green': '#47ce90',
        'cloudpano-blue': '#4c93ec',
        'middle-blue': 'rgb(18,134,251)'
      },
    },
    plugins: [],
  }
}
