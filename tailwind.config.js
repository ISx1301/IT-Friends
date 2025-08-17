/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    // "одинаковый фон у двух соседей"
    "[.bg-token-white+&.bg-token-white]:!pt-0",
    "[.bg-token-gray+&.bg-token-gray]:!pt-0",
    "[.bg-token-mint+&.bg-token-mint]:!pt-0",
    "[.bg-token-turquoise+&.bg-token-turquoise]:!pt-0",
    "[.bg-token-sand+&.bg-token-sand]:!pt-0",

    // если надо также на lg
    "lg:[.bg-token-white+&.bg-token-white]:!pt-0",
    "lg:[.bg-token-gray+&.bg-token-gray]:!pt-0",
    "lg:[.bg-token-mint+&.bg-token-mint]:!pt-0",
    "lg:[.bg-token-turquoise+&.bg-token-turquoise]:!pt-0",
    "lg:[.bg-token-sand+&.bg-token-sand]:!pt-0",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      sm: '22rem',
      lg: '79.5rem',
      xl: '122rem',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        DEFAULT: '100%',
        sm: '100%',
        lg: '79.5rem',
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
      'transparent-btn-hover-bg': '#D9D9D9',
      'gradient-from': '#FFD394',
      'gradient-to': '#FFC36C',
      'section-white' : '#FEFEFE',
      'gradient-pills-from': '#01BCB1',
      'gradient-pills-to': '#01D4C7',
      'data-gray': '#858585'
    },
    fontFamily: {
      primary: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      secondary: ['Montserrat Alternates', 'sans-serif', ...defaultTheme.fontFamily.sans],
      play: ['Play', 'sans-serif', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      fontSize: {
        '5xl-custom': '2.375rem',
        '4xl-custom': '2.125rem',
        '3xl-custom': '1.375rem'
      },
      padding: {
        'nav-top': '.4rem',
        'nav-btm': '1.4rem',
        'section-top-bottom-padding': '3.95rem',
      },
      lineHeight: {
        'custom1': '1.4rem'
      },
      aspectRatio: {
        '11/9': '11 / 9',
        '4/11': '4 / 11',
        '2/3': '2 / 3',
        '2/1': '2 / 1',
        '5/2': '5 / 2',
        '3/4': '3 / 4',
        '11/3': '11 / 3',
        '11/16': '11 / 16',
        // '33/49': '33 / 49', TODO: check
        // '28/15': '28 / 15'
        '3/1': '3 / 1'
      },
      keyframes: {
        'marquee-to-top': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'marquee-to-bottom': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50%)' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'marquee-to-top-110000ms': 'marquee-to-top 100s linear infinite alternate',
        'marquee-to-bottom-110000ms': 'marquee-to-bottom 100s linear infinite alternate',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}