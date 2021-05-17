module.exports = {
  // mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // purge: ['./src/pages/**/*.jsx', './src/components/**/*.jsx'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
    },
    fontFamily: {
      display: 'Poppins',
      sans: 'Poppins',
    },
    extend: {
      colors: {
        gray: {
          900: '#141414',
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
}
