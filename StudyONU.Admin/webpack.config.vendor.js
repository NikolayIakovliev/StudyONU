const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        stats: { modules: false },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
            ]
        },
        entry: {
            vendor: ['react', 'react-dom', 'react-router-dom']
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.DllPlugin({
                name: '[name]_[hash]',
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json')
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? JSON.stringify('development') : JSON.stringify('production')
            })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative('./wwwroot/dist/', '[resourcePath]')
            })
        ] : [
                new webpack.optimize.UglifyJsPlugin()
            ])
    }];
};

