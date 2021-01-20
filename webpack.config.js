const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        vendor: [
            "jquery"
        ],
        main: ["babel-polyfill", './src/js/main-page/index.js'],
        map_service :  [
            "babel-polyfill"
            , './src/js/map-service/index.js'
          ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 8999,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],

                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                                noIeCompat: true,
                            },
                        },
                    }]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    'file-loader?name=[path][name].[ext]'
                ],
            },
            {test: /\.(woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'}
            ]
    },
    plugins: [
        // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
        new HtmlWebpackPlugin({
            title : 'Index Title',
            chunks : ['main'], // entry에서 해당 리스트를 제외한 나머지
            template: path.resolve(__dirname, 'src/view') + '/main-page.html',
            filename : 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
            // jQuery: 'jquery', // jquery 모듈을 불러온다.
            // proj4 : "proj4",
           // , ol : './src/libs/ol/ol.js'
        })
    ],
    devtool: "cheap-module-eval-source-map"
};