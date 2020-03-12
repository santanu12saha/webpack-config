const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: '' 
    },
    resolve: {
        extensions: ['.js', '.jsx'] 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, 
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:[
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                context: path.resolve(__dirname, 'src'),
                                hashPrefix: 'hash',
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    Browserslist: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};