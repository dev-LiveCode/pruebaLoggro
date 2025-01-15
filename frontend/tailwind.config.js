/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logoLImg': "url('./assets/img/logo-dark.png')",
        'logoDImg': "url('./assets/img/logo-light.png')",
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': {
          '50': '#efeeff',
          '100': '#e2e0ff',
          '200': '#cac7fe',
          '300': '#aaa5fc',
          '400': '#8881f8',
          '500': '#6b63f1',
          '600': '#4f46e5',
          '700': '#4038ca',
          '800': '#3730a3',
          '900': '#332e81',
          '950': '#1e1b4b',
        },
        // 'darkConfig': {
        //   '50': '#ebfeff',
        //   '100': '#ccf9ff',
        //   '200': '#a0f1ff',
        //   '300': '#5ee5ff',
        //   '400': '#15cefb',
        //   '500': '#00b1e1',
        //   '600': '#008dbd',
        //   '700': '#067098',
        //   '800': '#0f5a7b',
        //   '900': '#114b68',
        //   '950': '#021722',
        // }
        'darkConfig': {
          '50': '#f4f6fb',
          '100': '#e8ebf6',
          '200': '#ccd6eb',
          '300': '#9fb3da',
          '400': '#6b8bc5',
          '500': '#496dae',
          '600': '#375492',
          '700': '#2d4477',
          '800': '#293b63',
          '900': '#263454',
          '950': '#101523',
        }
      })
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

