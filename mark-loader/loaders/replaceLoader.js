// 如果使用箭头函数请注意this指向！！！
module.exports = function (source) {
    // return source.replace("dll", this.query.name)

    // let result = source.replace("dll", this.query.name)
    // this.callback(null, result)

    let callback = this.async();
    setTimeout(() => {
        callback(null, source.replace("dll", this.query.name));
    }, 1000)
}