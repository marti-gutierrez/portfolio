const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports =
{
    entry: './src/index.js',
    output:
    {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    resolve:
    {
        extensions: ['.js']
    },
    module:
    {
        rules:
        [
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options:
                        {
                            //Prefer 'Dart-sass'
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use:
                {
                    loader: "url-loader",
                    options:
                    {
                        limit: 10000,
                        mimetype: "aplication/font-woff",
                        name: "[name].[ext]",
                        outputPath: "./assets/fonts",
                        publicPath: "./assets/fonts",
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins:
    [
        new HtmlWebpackPlugin
        (
            {
                inject: 'body',
                template: './public/index.html',
                filename: './index.html'
            }
        ),
        new MiniCSSExtractPlugin(),
        new CopyPlugin
        (
            {
                patterns:
                [
                    {
                        from: path.resolve(__dirname,"src","assets/images"),
                        to: "assets/images"
                    },
                    {
                        from: path.resolve(__dirname,"src","assets/icons"),
                        to: "assets/icons"
                    }
                ]
            }
        )
    ]
}
