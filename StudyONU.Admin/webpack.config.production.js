const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassExtract = new ExtractTextPlugin("main.css");
const bundleOutputDir = './wwwroot/dist';

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: sassExtract.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        sassExtract,
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});