// presets 的执行顺序是从下到上，从右到左
module.exports = {
    presets: [
        // 将es6的语法转换为es5的语法
        ['@babel/preset-env', {
            corejs: "3", // 声明corejs版本
            useBuiltIns: "usage" // 当使用@babel/polyfill填充代码时，按需填充。
        }],
        "@babel/preset-react" //  将react的语法转换为es6的语法
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import"]
}