const path = require("path");
const webpack  = require("webpack")

module.exports = {
    mode: "production",
    entry: {
        vendors: ["react", "react-dom", "loadsh"]
    },
    output: {
        filename: "[name].dell.js",
        path: path.resolve(__dirname, "../dell"),
        library: "[name]"
    },
    plugins:[
        // new webpack.DellPlugin({
        //     name:"name",
        //     path:path.resolve(__dirname,"../dell/[name].manifes")
        // })
    ]
}