const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { override, fixBabelImports, addWebpackExternals, addWebpackAlias } = require('customize-cra')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const Custom = config => {
    let plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: true
        }),
        new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                warnings: false,
                output: {
                    comments: false
                }
            }
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
    if (process.env.NODE !== 'development') {
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
    addWebpackExternals({
        hljs: 'hljs',
        marked: 'marked',
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        'redux-saga': 'ReduxSaga',
        'redux-saga/effects': 'ReduxSagaEffects',
        immutable: 'Immutable',
        axios: 'axios'
    }),
    addWebpackAlias({
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
    }),
    Custom
)
