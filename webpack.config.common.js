const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function() {
    return {
        entry: {
            //polyfill: './src/polyfills.ts',
            //vendor: './src/vendor.ts'
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/' // have files living at same level as other build artifacts
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        module: {
            rules: [{
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.css$/,
                    loader: ['raw-loader']
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/app/index.html'
            })
            // ,
            // new BundleAnalyzerPlugin({
            //     analyzerPort: process.env.PORT,
            //     analyzerHost: process.env.IP
            // })
        ],

        optimization: {
            splitChunks: {
                chunks: "all"
                // ,
                // cacheGroups: {
                //     commons: {
                //         test: /[\\/]node_modules[\\/]/,
                //         name: 'vendors',
                //         chunks: 'all'
                //     }
                // }
            }
        }
    };
}();
