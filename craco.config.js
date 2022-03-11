const path = require('path')
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
    }
  }
}
