/**
 * 数据源
 */
const state = {
    aFlag: false,
    msg: 'oukele',
    text: 'text'
}

/**
 * 在mutations中写上自定义的方法，
 * 然后在组件的js中通过 this.$store.commit("自定义的方法名")
 * 可以更新 store(即上方定义的 state对象 的属性值) 中的数据和状态
 *
 * 注意：mutations 必须是同步函数 ( 因为在 mutations 中导致任何数据源状态变更都应该在此刻完成 )
 * 官方解释：在 mutation 中混合异步调用会导致你的程序很难调试。
 *         例如，当你调用了两个包含异步回调的 mutation 来改变状态，
 *         你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。
 *         在 Vuex 中，mutation 都是同步事务
 *
 * 为了处理异步操作，请使用 Action
 */
const mutations = {

    /**
     * 更改 state 中 aFlag 的值 方法
     * @param state 数据源对象
     */
    changeAFlag(state){
        state.aFlag = true;
    },

    /**
     * 更改 state 中 msg 的值 方法( 可以传递自定义参数 ) + 本地持久化
     * @param state 数据源对象
     * @param params 传递的自定义参数
     */
    changeMsg(state , params){
        // state.msg的默认值为 oukele
        // 不进行持久化
        if ( !params.isEndurance ){
            localStorage.removeItem('msg');
        } else {
            // 进行持久化
            // 如不清楚浏览器的 localStorage 如何使用,请自行查询
            // 注意：localStorage 存放的值 如果是对象类型,请使用 JSON.stringify() 转成 字符串
            localStorage.setItem('msg',params.msg);
        }
        state.msg = params.msg;
    },

    changeText(state,params){
        state.text = params.msg;
    }
}

/**
 * store 中定义“getter”（可以认为是 store 的计算属性）
 * Getter 会暴露为 store.getters 对象，你可以以属性的形式访问 state(数据源中的) 这些值
 */
const getters = {

    /**
     * 在外部中 可通过 this.$store.getters.getAFlag 取出 aFlag 的值
     * 注意：因为我这里使用了 模块化，所以使用时应该是这样的调用：
     *                      模块名 + 调用的函数
     * this.$store.getters['storeDemo1/getAFlag']
     *
     * @param state
     */
    getAFlag(state){
        return state.aFlag;
    },
    msg( state ){
        // 获取存在 localStorage 的数据
        let msg = localStorage.getItem('msg');
        if ( msg ) state.msg = msg;
        return state.msg;
    },
    text( state ){
        return state.text;
    }
}

const actions = {

    /**
     *  原来方式只有两个参数：context , payload (传递的参数)
     *  第一个参数 { state , commit ,  dispatch }
     *      其实就相当于 context.state , context.commit , context.dispatch
     *      把 context 打印出来 ^_^
     * @param state
     * @param commit
     * @param dispatch
     * @param params
     */
    async changeText({ commit ,  dispatch } , params){
        console.log(1)
        await dispatch('goOut')
        console.log(2)
        // 执行 mutations 中的方法
        commit('changeMsg' , {msg: '在 action 中 执行mutations-changeMsg的方法' });
        console.log(3)
        await dispatch('buyApple');
        console.log(4)
        dispatch('washApple');
        console.log(5)
        dispatch('eatApple', params);
        console.log('整个流程结束了。')

    },

    /**
     * 出门 模拟异步请求
     */
    goOut(){
        return new Promise((resolve) => {
            setTimeout(()=>{
                console.log('我出门啦,然后过了2秒到水果店啦。')
                resolve(true)
            },2000)
        })
    },

    /**
     * 买苹果 模拟异步请求
     */
    buyApple(){
        return new Promise(resolve => {
            setTimeout(()=>{
                console.log('在水果店花了1秒,买到苹果啦。')
                resolve(true);
            },1000)
        })
    },

    /**
     * 洗苹果
     */
    washApple(){
        // 模拟走回来 所需要的时间
        let now = new Date();
        let exitTime = now.getTime() + 3000;
        let flag = true;
        while ( flag ) {
            now = new Date();
            if (now.getTime() > exitTime) break;
        }
        console.log('然后花了3秒,洗好苹果啦。')
    },

    /**
     * 吃苹果
     */
    eatApple({ commit } , params){
        console.log('开吃！开吃！冲啊！干饭人。')
        commit('changeMsg' , { msg: '冲啊,干饭人!' + params.msg  });
        console.log('老八...')
        commit('changeText' , { msg: '啊啊啊啊！！！秘制小...汉堡'});
    },

}

export default { state , mutations , getters , actions }