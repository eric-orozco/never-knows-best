var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ngw = require('@ngtools/webpack');

var commonConfig = require('./webpack.config.common');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    entry: {
        app: './src/app/main.aot.ts'
    },

    output: {
        filename: '[name].bundle.[hash].js', // adding hash for cache-busting
        chunkFilename: '[id].[hash].chunk.js' // have webpack dynamically name the lazy-loaded chunks
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.ts$/,
                use: [{
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                    // load lazily-loaded routes
                    , { loader: 'angular-router-loader?aot=true' }

                ]
            }
        ]
    },

    plugins: [
        // ahead of time compilation
        new ngw.AngularCompilerPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: './src/app/app.module#AppModule'
        }),
        // enable gzipping of files
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            // compress JS/CSS/HTML/Fonts
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            minRatio: 0.8
        })
    ]
});
