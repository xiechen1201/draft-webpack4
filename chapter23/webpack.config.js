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
        // eslint 出现问题会在页面提示错误
        overlay: true,
        contentBase: "./dist",
        open: true,
        hot: true, // 让 webpack-dev-server 开启 module-replacement 的功能
        hotOnly: true, // 即便css样式没有生效也不让浏览器自动刷新页面
        historyApiFallback: true, // 所有路由都响应 index.html 的内容
        // 当接口遇到 /react/api 开头就转发到 http://www.dell-lee.com 作为前缀
        proxy: {
            // "/react/api": "http://www.dell-lee.com"
            "/react/api": {
                target: "http://www.dell-lee.com",
                // 容许请求 https
                secure: false,
                pathRewrite: {
                    "header.json": "demo.json"
                },
                // 突破对 changeOrigin 的限制
                changeOrigin: true
            }
        }
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
            use: ["babel-loader", "eslint-loader"]
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