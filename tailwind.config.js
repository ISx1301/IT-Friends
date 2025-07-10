/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      ...defaultTheme.screens,
      sm: '20rem',
      // sm: '22rem',
      lg: '77.5rem',
      // lg: '79.5rem',
      xl: '120rem',
      // xl: '122rem',
    },
    container: {
      center: true,
      padding:  '1rem',
      screens: {
        DEFAULT: '100%',
        sm: '100%',
        lg: '77.5rem',
        // lg: '79.5rem',
      },
    },
    colors: {
      'primary-green': '#01A49A',
      'primary-orange': '#F9AE43',
      'primary-turquoise': '#EAFFFE',
      'primary-sand': '#FFD292',
      'gray': '#F6F6F6',
      'transparent-btn-border': '#ADADAD',
      'white': '#FFFFFF',
      'black': '#1D1D1D',
      'red-error': '#FF5C5C',
      'link-blue': '#1983FE',
      'span-gray': '#9C9C9C',
      'span-sand': '#FFC16A',
      'span-mint': '#09D7CA',
      'transparent-btn-hover-bg': '#D9D9D9'
    },
    fontFamily: {
      primary: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      secondary: ['Montserrat Alternates', 'sans-serif', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      fontSize: {
        '4xl-custom': '2.125rem',
        '3xl-custom': '1.375rem'
      },
      padding: {
        'nav-top': '.4rem',
        'nav-btm': '1.4rem',
        'section-top-bottom-padding': '3.95rem',
        '9-custom': '2.375rem',
        '1-custom': '0.26rem',
        '20-custom': '5.375rem'
      },
      margin: {
        '11custom': '2.625rem'
      },
      lineHeight: {
        'custom1': '1.4rem'
      },
      aspectRatio: {
        '11/9': '11 / 9',
        '4/11': '4 / 11',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.expanded > .hidden': {
          'display': 'inline',
        },
      });
    },
  ],
}