const {
    merge
} = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = {
    // 打包的模式（默认的打包模式是 production 代码会被压缩，反而 development 不会）
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    output: {
        filename: "[name].js",
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        hot: true, // 让 webpack-dev-server 开启 module-replacement 的功能
        hotOnly: true, // 即便css样式没有生效也不让浏览器自动刷新页面
    },
    module: {
        rules: [{
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
        }, ]
    }
}
module.exports = merge(commonConfig, devConfig);