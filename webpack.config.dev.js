const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DoTenv = require('dotenv-webpack');

module.exports =
{
    entry: './src/index.js',
    output:
    {
        path: path.resolve(__dirname,'dist'),
        filename: '[name.[contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: 'development',
    resolve:
    {
        extensions: ['.js'],
        alias:
        {
            '@style': path.resolve(__dirname,'src/style/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
            '@icons': path.resolve(__dirname,'src/assets/icons/'),
        }
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
                test: /\.(woff|woff2)$/i,
                type: "asset/resource",
                generator:
                {
                    filename: "assets/fonts/[hash][ext][query]"
                }
                // use:
                // {
                //     loader: "url-loader",
                //     options:
                //     {
                //         limit: 10000,
                //         mimetype: "aplication/font-woff",
                //         name: "[name].[ext]",
                //         outputPath: "./assets/fonts",
                //         publicPath: "./assets/fonts",
                //         esModule: false
                //     }
                // }
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
        new MiniCSSExtractPlugin
        (
            {
                filename: "assets/[name].[contenthash].css"
            }
        ),
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
        ),
        new DoTenv()
    ]
}
