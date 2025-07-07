/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: { 
    screens: {
      sm: '320px',
      lg: '1240px',
      xl: '1920px',
    },
    container: {
      center: true, 
      padding: '0', 
      screens: {
        DEFAULT: '100%', 
        sm: '100%', 
        lg: '1240px', 
        xl: '1920px', 
      },
        padding: {
        DEFAULT: '1rem', 
        lg: '0rem',      
  },
    },
    colors: {
      'primary-green': '#01A49A',
      'primary-orange': '#F9AE43',
      'primary-turquoise': '#EAFFFE',
      'primary-sand': '#FFD292',
      'gray': '#F6F6F6',
      'white': '#FFFFFF',
      'black': '#1D1D1D',
      'red-error': '#FF5C5C',
      'link-blue': '#1983FE',
    },
    fontFamily: {
      primary: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      secondary: ['Montserrat Alternates', 'sans-serif', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      padding: {
        'nav-top': '.4rem',
        'nav-btm': '1.4rem'
      },
      aspectRatio: {
        '11/9': '11 / 9',
        '4/11': '4 / 11',
      },
    },
  },
  plugins: [],
}