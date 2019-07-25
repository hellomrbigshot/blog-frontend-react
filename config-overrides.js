const path = require('path')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { override, fixBabelImports, addWebpackExternals, addWebpackAlias } = require('customize-cra')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const Custom = config => {
    let plugins = [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        //     ignoreOrder: true
        // }),
        // new ParallelUglifyPlugin({
        //     uglifyJS: {
        //         output: {
        //             comments: false
        //         },
        //         warnings: false
        //     }
        // }),
        // new CompressionWebpackPlugin({
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp('\\.(js|css)$'),
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ]
    if (process.env.NODE_ENV !== 'development') {
        config.plugins = [...config.plugins, ...plugins]
    }
    return config
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    // addWebpackExternals({
    //     hljs: 'hljs'
    // }),
    addWebpackAlias({
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
    }),
    Custom
)
