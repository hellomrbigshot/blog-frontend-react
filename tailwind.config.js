module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      height: {
        15: '3.75rem'
      },
      lineHeight: {
        15: '3.75rem'
      },
      padding: {
        0.75: '0.1875rem'
      },
      borderWidth: {
        3: '3px'
      },
      transitionProperty: {
        'height': 'height'
       }
     },
   },
   variants: {
    extend: {
    }
   }
}
