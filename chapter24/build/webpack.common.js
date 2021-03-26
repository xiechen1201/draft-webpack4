const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const {
    merge
} = require("webpack-merge");
const addAssetsHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")

const commonConfig = {
    // 项目从哪个文件开始打包
    entry: {
        main: "./src/index.js",
    },
    // 项目打包输出的配置
    output: {
        // 打包后输出的路径（不写也是可以的，因为这就是默认的路径，建议w写上更加直观），__dirname 表示当前目录下
        path: path.resolve(__dirname, "../dist"),
    },
    resolve: {
        // 自动帮我们把文件后缀补齐（从左到右）
        extensions: [".js", ".jsx"],
        // 自动帮我们查找文件（从左到右）
        mainFiles: ["index", "child"],
        // 别名，根据配置的别名查找路径
        alias: {
            "@": path.relative(__dirname, "src/coms")
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
            test: /\.m?js$/,
            exclude: /node_modules/, //  排除node_modules下的代码
            use: {
                loader: "babel-loader"
            }
        }]
    },
    optimization: {
        // TreeShaking 的配置
        usedExports: true,
        // SplittingCode 的配置
        splitChunks: {
            chunks: 'all', // 分割引入代码库的方式，默认为 async 异步，可选 all：同步和异步
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "chunk"
                }
            }
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
        // 将静态资源添加到html中
        new addAssetsHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, "../dell/vendors.dell.js")
        })
    ],
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}