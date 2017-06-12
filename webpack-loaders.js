"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options) {
    return {
        devServer:{
            historyApiFallback: true,
            hot: true, // Enable hot module
            inline: true,
            stats: 'errors-only',
            host: options.host, // http://localhost
            port: options.port, // 3000
            contentBase: './client/dist',
        }
    };
};

exports.plugins = [ // Hot module
    new webpack.HotModuleReplacementPlugin({
        multistep: true
    }),
    new ExtractTextPlugin({filename: 'style.css'})
];

// the css loader
exports.scss = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: ['css-loader', 'sass-loader']
    })
};

// The file loader
exports.font = {
    test: /\.ttf$/,
    use: ['file-loader']
}
// Babel loader
exports.babel = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader']
};