const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const webpack = require('webpack');
const bundleOutputDir = './wwwroot/dist';

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'es2015', 'stage-0']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')
        })
    ]
});