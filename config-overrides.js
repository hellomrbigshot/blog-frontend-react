const path = require('path')
const { override, fixBabelImports, addWebpackExternals, addWebpackAlias } = require('customize-cra')
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    addWebpackExternals({
        hljs: 'hljs'
    }),
    addWebpackAlias({
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
    })
)
