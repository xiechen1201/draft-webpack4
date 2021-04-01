const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default; // 默认导出为 ESModule 的方式
const core = require("@babel/core");
// 引入path模块
const path = require("path");

// 分析代码依赖
const moduleAnalyser = (filename) => {
    // 读取文件
    const content = fs.readFileSync(filename, "utf-8");
    // 提取文件依赖(代码分析)
    let parseContent = parser.parse(content, {
        sourceType: "module"
    })
    // 遍历 import 节点
    const depencies = {};
    traverse(parseContent, {
        // 到遇到引入模块的时候
        ImportDeclaration({
            node
        }) {
            const dirname = path.dirname(filename);
            const newFile = path.join(dirname, node.source.value)
            depencies[node.source.value] = newFile;
        }
    })
    // 把 AST 抽象语法树转换为一个对象，可以在浏览器中运行的 Code
    const {
        code
    } = core.transformFromAst(parseContent, null, {
        presets: ["@babel/preset-env"]
    })
    return {
        filename,
        depencies,
        code
    }
}

// 遍历所有模块，分析整个项目的依赖关系
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser(entry);
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const {
            depencies
        } = item;
        if (depencies) {
            for (const j in depencies) {
                graphArray.push(moduleAnalyser(depencies[j]))
            }
        }
    }
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            depencies: item.depencies,
            code: item.code
        }
    })
    return graph;
}

const generateCode = (entry) => {
    // 如果不转为字符串得到的结果就是 [Object Object]
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    // 返回一个立即执行函数防止全局变量污染
    return `
    (function(graph){
        // 因为我们生成的依赖对象中的Code存在require方法
        function require(module){
            // 将相对路径转换为绝对路径例如 ./message/js = ./src/message.js
            function localRequire(relativePath){
                return require(graph[module].depencies[relativePath])
            }
            // 因为我们生成的依赖对象中的Code存在exports对象
            var exports = {};
            // 执行每个模块的代码 index/message/word
            // 当执行到require的时候实际执行的是localRequire
            (function(require,exports,code){
                eval(code)
            })(localRequire,exports,graph[module].code);
            return exports;
        }
        require('${entry}');
    })(${graph})
    `;
}

const code = generateCode("./src/index.js");
console.log(code);