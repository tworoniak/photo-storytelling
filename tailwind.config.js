/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e67e22',
        shade: '#cf711f',
        tint: '#eea564',
        heroBg: '#fae5d3',

        background: '#fbfffe',
        surface: '#8fb996',
        card: '#18181D',
        border: '#22222A',

        text: '#555',
        muted: '#C9C9D1',
        subtle: '#8B8B95',
        faint: '#5A5A63',

        accent: '#709775',
        accent2: '#a1cca5',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
