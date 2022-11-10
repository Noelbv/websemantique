/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'blacked': '#1C1B1B',
			  },
			fontFamily: {
				'poppins': ['"Poppins"'],
			}
		},
	},
	variants: {},
	plugins: [],
};
