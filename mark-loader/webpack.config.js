const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    // 寻找 Loader 的路径（从左到右）
    resolveLoader: {
        modules: ["node_modules", "./loaders"]
    },
    module: {
        rules: [{
            test: /\.js/,
            // 使用本地的 Loader
            use: [{
                loader: "replaceLoader",
                options: {
                    name: "test"
                }
            }]
        }]
    }
}