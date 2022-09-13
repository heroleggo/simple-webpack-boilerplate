const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.WEBPACK_MODE || 'development';

module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3,
                                    proposals: true,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
    },

    mode: 'development',

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 5000,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};
