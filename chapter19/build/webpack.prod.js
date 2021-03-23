const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prodConfig = {
    // 打包的模式（默认的打包模式是 production 代码会被压缩，反而 development 不会）
    mode: "production",
    devtool: "cheap-module-source-map",
    output: {
        filename: "[name].[contenthash].js",
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: "css-loader",
                options: {
                    importLoaders: 2,
                    modules: true
                }
            }, "sass-loader", "postcss-loader"]
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        }, ]
    },
    optimization: {
        // CSS代码压缩
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].[hash].css"
    })]
}

module.exports = prodConfig;