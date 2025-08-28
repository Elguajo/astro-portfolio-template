const colors = require('tailwindcss/colors')
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`
const hexToRgb = (hex) => {
  hex = hex.replace('#', '')
  hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

module.exports = {
  content: [
    "../../src/**/*.{astro,html,js,jsx,ts,tsx}",
    "../src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            a: {
              textDecoration: 'unset',
            },
            h1: {
              scrollMarginTop: '5rem',
            },
            h2: {
              scrollMarginTop: '5rem',
            },
            h3: {
              scrollMarginTop: '5rem',
            },
          }
        },
        tao: {
          css: {
            '--tw-prose-body': colors.gray[700],
            '--tw-prose-headings': colors.slate[900],
            '--tw-prose-lead': colors.slate[600],
            '--tw-prose-links': colors.slate[900],
            '--tw-prose-bold': colors.slate[900],
            '--tw-prose-counters': colors.slate[500],
            '--tw-prose-bullets': colors.slate[300],
            '--tw-prose-hr': colors.slate[200],
            '--tw-prose-quotes': colors.slate[900],
            '--tw-prose-quote-borders': colors.slate[200],
            '--tw-prose-captions': colors.slate[500],
            '--tw-prose-kbd': colors.slate[900],
            '--tw-prose-kbd-shadows': hexToRgb(colors.slate[900]),
            '--tw-prose-code': colors.slate[900],
            '--tw-prose-pre-code': colors.slate[200],
            '--tw-prose-pre-bg': colors.slate[800],
            '--tw-prose-th-borders': colors.slate[300],
            '--tw-prose-td-borders': colors.slate[200],

            '--tw-prose-invert-body': '#fdfaf6',
            '--tw-prose-invert-headings': '#fdfaf6',
            '--tw-prose-invert-lead': colors.slate[400],
            '--tw-prose-invert-links': '#fdfaf6',
            '--tw-prose-invert-bold': '#fdfaf6',
            '--tw-prose-invert-counters': colors.slate[400],
            '--tw-prose-invert-bullets': colors.slate[600],
            '--tw-prose-invert-hr': colors.slate[700],
            '--tw-prose-invert-quotes': colors.slate[100],
            '--tw-prose-invert-quote-borders': colors.slate[700],
            '--tw-prose-invert-captions': colors.slate[400],
            '--tw-prose-invert-kbd': '#fdfaf6',
            '--tw-prose-invert-kbd-shadows': hexToRgb(colors.white),
            '--tw-prose-invert-code': '#fdfaf6',
            '--tw-prose-invert-pre-code': colors.slate[300],
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': colors.slate[600],
            '--tw-prose-invert-td-borders': colors.slate[700],
          },
        },
      }),
    },
  },
}
