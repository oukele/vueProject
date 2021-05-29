import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 批量自动导入 自定义不同的vuex模块
let modules = {}

// 在 modules当前目录中 找出所有以 .js 结尾的文件
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
})
Object.keys(modules).forEach((key) => {
    // 使其成为带命名空间的模块。
    // 保证在变量名一样的时候，添加一个父级名拼接
    modules[key]["namespaced"] = true;
});
// 以下的结果为：
/**
 *
 *   {
 *       "storeDemo1": { 第一个模块
 *          "namespaced": true,
 *          "state": {
 *              "aFlag": false
 *           },
 *       },
 *       "storeDemoN.." : { 第 n 个 模块
 *           "namespaced": true,
 *           "state": {
 *              "N..Flag": false
 *           },
 *       }
 *   }
 */

const store = new Vuex.Store({
    modules
})
export default store;