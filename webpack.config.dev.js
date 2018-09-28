var path = require('path');
var webpackMerge = require('webpack-merge');

var commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',

    entry: {
        app: './src/app/main.ts'
    },

    devtool: 'eval', // use 'cheap-module-eval-source-map' for highest level of detail source map but bundle will be huge

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js' // have webpack dynamically name the lazy-loaded chunks
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true // set so that we don't analyze ALL typescript files (even those not included in this build process which would cause AOT issues)
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    },
                    {
                        loader: 'angular-router-loader' // load lazily-loaded routes
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },

    devServer: {
        historyApiFallback: true, // so we can use HTML 5 paths without hash-bang inbetween
        stats: 'minimal',
        // use a provided (through package.json scripts, etc.) port and IP if given, otherwise fall back
        host: process.env.IP || 'localhost',
        port: process.env.PORT || '8080'
    }
});
