const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    // 项目从哪个文件开始打包
    entry: {
        main: "./src/index.js",
    },
    // 项目打包输出的配置
    output: {
        // 打包后的文件名
        filename: "[name].js",
        // 打包后输出的路径（不写也是可以的，因为这就是默认的路径，建议w写上更加直观），__dirname 表示当前目录下
        path: path.resolve(__dirname, "../dist"),
    },
    module: {
        rules: [{
            test: /\.jpg|.jpeg|.png$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 54000,
                    name: "[name].[ext]",
                    outputPath: "/images",
                }
            }
        }, {
            test: /\.scss$/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    importLoaders: 2,
                    modules: true
                }
            }, "sass-loader", "postcss-loader"]
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }, {
            test: /\.m?js$/,
            exclude: /node_modules/, //  排除node_modules下的代码
            use: {
                loader: "babel-loader"
            }
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 分割引入代码库的方式，默认为 async 异步，可选 all：同步和异步
            minSize: 20000, // 引入的代码库最小为20000字节
            minRemainingSize: 0,
            maxSize: 0,
            minChunks: 1, // 代码库至少被引入1次
            maxAsyncRequests: 30, // 同时加载的模块数最大是 30
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/, // 是否是 node_modules 下的代码库
                    priority: -10,
                    reuseExistingChunk: true,
                    // filename: "vendors.js"
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,  // 如果一个模块被打包过就不再进行打包
                    filename: "common.js"
                },
            },
        },
    },
    plugins: [
        // 自动引入打包好的js文件
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // 清除dist文件夹
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, '../dist')
            ],
        }),
    ],
}