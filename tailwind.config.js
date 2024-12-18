/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            main: {
               DEFAULT: '#4A090D',
            },
            sub: {
               DEFAULT: '#E7D8CB',
            },
         },
      },
   },
   plugins: [],
};
