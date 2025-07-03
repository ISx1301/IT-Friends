/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: { // TODO: set your containers
		screens: {
			sm: '640px',
			md: '768px',
			lg: '992px',
			xl: '1160px',
		},
		container: {
			center: true,
			padding: '1rem'			
		},
		colors: {
			'white': '#ffffff',
			'black': '#000000',
			'red': {
				DEFAULT: '#fd6150',
				'error': '#e54230'
			},
		},
		fontFamily: {
			primary: ['Anek Latin', 'sans-serif', ...defaultTheme.fontFamily.sans], // TODO: include 2 fonts, https://transfonter.org/
			// secondary: ['Inter', 'sans-serif', ...defaultTheme.fontFamily.sans],
		},
		extend: {
      // TODO: remove if not needed
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			borderRadius: {
				'4xl': '2rem'
			},
			aspectRatio: {
				'11/9': '11 / 9',
				'4/11': '4 / 11',
			},
		},
	},
	plugins: [],
}
