const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.ts/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    }
}