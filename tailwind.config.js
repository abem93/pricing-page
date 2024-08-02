/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts, scss}",],
  theme: {
    extend: {
      colors: {
        'cloudpano-blue': 'rgb(89, 193, 201)',
      },
    },
    plugins: [],
  }
}
