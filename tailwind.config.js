/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [],
  theme: {
    screens: {
      xs: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    extend: {
      container: {
        screens: {
          lg: '1024px',
          xl: '1440px',
          sxl: '1800px',
          '2xl': '1920px',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#37444d',
          medium: '#3f505c',
          light: '#5e6971',
        },
        secondary: {
          DEFAULT: '#cd1402',
          light: '#fec8c3',
        },
        red: {
          DEFAULT: '#e34545',
          light: '#f1a2a2',
        },
        green: {
          DEFAULT: '#a0c000',
          light: '#e4ff60',
        },
        blue: {
          DEFAULT: '#51a4da',
          light: '#a8d1ec',
        },
        purple: {
          DEFAULT: '#a0406d',
          light: '#d699b6',
        },
        orange: {
          DEFAULT: '#ee7e00',
          light: '#ffbf77',
        },
        glacial: {
          DEFAULT: '#397dbe',
          light: '#9abee1',
        },
        brown: {
          DEFAULT: '#644117',
          light: '#f2e6d9',
        },
        pink: {
          DEFAULT: '#d998a0',
          light: '#fff0f5',
        },
        yellow: {
          DEFAULT: '#f3e03b',
          light: '#fff8e1',
        },
        ivory: {
          DEFAULT: '#CFC3AD',
          light: '#FFFDF7',
        },
        light: '#d4d6da',
      },
      fontSize: {
        headline: '4rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        condensed: ['var(--font-roboto-condensed)', 'sans-serif'],
      },
    },
  },
}
