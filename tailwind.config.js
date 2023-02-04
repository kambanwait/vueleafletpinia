/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      colors: {
        'brand-blue': 'rgba(33, 150, 243, .6)',
      },
    },
  },
  daisyui: {
    styled: true,
    themes: [
      {
        corporate: {
          ...require('daisyui/src/colors/themes')['[data-theme=corporate]'],
          primary: '#ff6c01',
          secondary: '#454545',
          accent: '#ffd060',
          neutral: '#454545',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
  },
}
