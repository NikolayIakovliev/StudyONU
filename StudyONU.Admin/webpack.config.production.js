const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssExtract = new ExtractTextPlugin("[name]-legacy.css");
const sassExtract = new ExtractTextPlugin("[name].css");
const bundleOutputDir = './wwwroot/dist';

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: cssExtract.extract({
                    use: 'css-loader?minimize'
                })
            },
            {
                test: /\.scss$/,
                use: sassExtract.extract({
                    use: ['css-loader?minimize', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        cssExtract,
        sassExtract,
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});