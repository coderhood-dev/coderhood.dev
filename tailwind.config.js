module.exports = {
  mode: 'jit',
  purge: {
    enabled: false,
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
      serif: 'Poppins',
      sans: 'Open Sans',
      display: 'Open Sans',
    },
    extend: {
      colors: {
        gray: {
          200: '#FAFAFA',
          800: '#34373A',
          900: '#141414',
        },
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            'h1,h2,h3,h4': {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
              '&:before': { color: theme('colors.gray.800') },
              '&:after': { color: theme('colors.gray.800') },
              color: theme('colors.gray.100'),
            },
            pre: {
              code: {
                backgroundColor: theme('colors.gray.800'),
              },
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
      margin: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      ringWidth: ['hover', 'active'],
      textColor: ['dark'],
    },
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
