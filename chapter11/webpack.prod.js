const {
    merge
} = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const prodConfig = module.exports = {
    // 打包的模式（默认的打包模式是 production 代码会被压缩，反而 development 不会）
    mode: "production",
    devtool: "cheap-module-source-map",
    // 项目从哪个文件开始打包
    entry: "./src/index.js",
}

module.exports = merge(commonConfig, prodConfig);