const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: ["babel-polyfill", "./src/index.js"],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Backendless",
            template: "./src/index.ejs",
            charset: "UTF-8"
        }),
        extractLess
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react']
                    }
                }
            },
        ],
    },
};