"use strict";
const merge = require('webpack-merge');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
    entry: [ // The entry file is index.js in /client/src
        PATHS.src + "/index.js",
        PATHS.src + "/scss/style.scss"
    ],
    output: { // The output defines where the bundle output gets created
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            loaders.babel, // Transpiler
            loaders.scss, // Our bundle will contain the css
            loaders.font // Load fonts
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', 'scss'] // the extensions to resolve
    }
};

common.plugins = loaders.plugins;

let config;
// The switch defines the different configuration as development requires webpack-dev-server
switch(process.env.NODE_ENV) {
    case 'build':
        config = merge(
            common,
            { devtool: 'source-map' } // SourceMaps on separate file
        );
        break;
    case 'development':
        config = merge(
            common,
            { devtool: 'eval-source-map' }, // Default value
            loaders.devServer({
                host: process.env.host,
                port: 3000
            })
        );
}

// We export the config
module.exports = config;