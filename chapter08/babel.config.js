module.exports = {
    presets: [
        ['@babel/preset-env', {
            corejs: "3", // 声明corejs版本
            useBuiltIns: "usage" // 当使用@babel/polyfill填充代码时，按需填充。
        }]
    ]
}