const { light: lightTheme } = require('./src/theme/antdTheme/lightRequire')
const path = require('path')
const { generateTheme } = require('antd-theme-generator')
const themeVariables = Object.keys(lightTheme)

const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  mainLessFile: path.join(__dirname, './src/styles/main.less'),
  themeVariables: themeVariables,
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
  customColorRegexArray: [/^color\(.*\)$/]
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  })
  