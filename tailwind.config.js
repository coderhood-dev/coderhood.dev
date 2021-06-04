module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/layouts/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'class',
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
      textColor: ['dark'],
      // width: ['dark'],
      // height: ['dark'],
      // overflow: ['dark'],
    },
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
