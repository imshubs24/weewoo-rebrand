/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'Mogra': ['Mogra', 'sans-serif']
      },
      fontSize: {
        '1rem': '1rem',
        '2rem': '2rem',
        'logo': '3rem',
        '4rem': '4rem',
        '5rem': '5rem',
      },
      dropShadow: {
        'home-about-us': [
          '0 5px 10px rgba(0, 0, 0, 0.4)'
        ],
        'hero-section-text': [
          '0 10px 5px rgba(0, 0, 0, 1)'
        ],
        'hero-navigate-button': [
          '0 10px 10px rgba(0, 0, 0, 0.5)'
        ]
      },
      boxShadow: {
        'help-accordion': [
          '0 0 50px 5px rgba(0, 0, 0, 0.7)'
        ]
      }
    },
  },
  plugins: [],
}

