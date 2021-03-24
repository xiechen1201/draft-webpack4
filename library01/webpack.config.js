const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    // 打包的过程中忽略 loadha 库，让业务代码加载 loadsh
    externals: ["loadsh"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        // 不管是什么引入方式都可以使用(支持CMD、AMD、ESModule)
        libraryTarget: "umd",
        // 支持 srcipt 标签引入，并生成全局变量
        library: "library"
    }
}