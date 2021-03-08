const path = require("path");

module.exports = {
    // 打包的模式，默认的打包模式是 production，代码会被压缩，反而 development 不会
    mode: "development",
    // 项目从哪个文件开始打包
    entry: "./src/index.js",
    // 项目打包输入的配置
    output: {
        // 打包后的文件名
        filename: "main.js",
        // 打包后输出的路径（不写也是可以的，因为这就是默认的路径，建议写上更加直观
        // __dirname 表示当前目录下
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.png$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "/images",
                }
            }
        }, {
            test: /\.jpg|.jpeg$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 54000
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
        }]
    }
}