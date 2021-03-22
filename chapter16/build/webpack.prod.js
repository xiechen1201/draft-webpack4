const {
    merge
} = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prodConfig = module.exports = {
    // 打包的模式（默认的打包模式是 production 代码会被压缩，反而 development 不会）
    mode: "production",
    devtool: "cheap-module-source-map",
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
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].[hash].css"
    })]
}

module.exports = merge(commonConfig, prodConfig);