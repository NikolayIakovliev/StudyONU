const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './wwwroot/dist';

module.exports = {
    stats: { modules: false },
    entry: {
        main: './src/app.jsx'
    },
    resolve: { extensions: ['.js', '.jsx'] },
    output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: 'app.bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ]
};