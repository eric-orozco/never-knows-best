const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {

    return {

        output: {
            path: path.resolve(__dirname, 'dist'), // build destination directory
            publicPath: '/' // have files living at same level as other build artifacts
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.css$/,
                    loader: ['raw-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        // fallback to style-loader in development
                        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/app/index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new BundleAnalyzerPlugin({
                // analyzerMode: 'server' to start HTTP server to display report;
                // 'static' for single .html file
                analyzerMode: 'static',
                analyzerPort: 8082, // 8080 is web app, 8081 is backend API
                analyzerHost: process.env.IP
            })
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    };
}();
