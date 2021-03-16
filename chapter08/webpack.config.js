const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    // 打包的模式，默认的打包模式是 production，代码会被压缩，反而 development 不会
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    // 项目从哪个文件开始打包
    entry: "./src/index.js",
    // 项目打包输入的配置
    output: {
        // 打包后的文件名
        filename: "[hash].js",
        // 打包后输出的路径（不写也是可以的，因为这就是默认的路径，建议写上更加直观
        // __dirname 表示当前目录下
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        hot: true, // 让 webpack-dev-server 开启 module-replacement 的功能
        hotOnly: true, // 即便css样式没有生效也不让浏览器自动刷新页面
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
                loader: "babel-loader",
                // options: {
                //     // presets[ [需要使用presets的名字,{具体配置}] ]
                //     presets: [
                //         ['@babel/preset-env', {
                //             corejs: "3", // 声明corejs版本
                //             useBuiltIns: "usage" // 当使用@babel/polyfill填充代码时，按需填充。
                //         }]
                //     ]
                // }
            }
        }]
    },
    plugins: [
        // 自动引入打包好的js文件
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // 清除dist文件夹
        new CleanWebpackPlugin(),
    ]
}