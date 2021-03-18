// 静态导入
// import _ from "lodash";
// console.log(_.join(["a", "b", "c"], "--"));


// 动态导入
function getComponent() {
    // 之所以需要 default，是因为 webpack 4 在导入 CommonJS 模块时，将不再解析为 module.exports 的值，而是为 CommonJS 模块创建一个 artificial namespace 对象
    return import("lodash").then(({
        default: _
    }) => {
        console.log(_.join(["a", "b", "c"], "--"));
    })
}
getComponent();


// npm install babel-plugin-dynamic-import-webpack