<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="demo-body">
      <div class="showText">

        <div>
          aFlag：{{ aFlag2 }}
        </div>

        <div>
          msg: {{ vuexMsg }}
        </div>

        <div>
          text: {{ vuexText }}
        </div>

      </div>
      <div class="operating">
        <button @click="changeAFlag">
          操作 aFlag
        </button>
        <button @click="changeMsg(false)">
          操作 msg
        </button>
        <button @click="changeMsg(true)">
          操作 msg + 持久化
        </button>
        <button @click="changeText">
          action
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState , mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    // 获取 vuex 的值 有以下几种方式
    // 1.
    aFlag0(){
      return this.$store.getters['storeDemo1/getAFlag'];
    },
    // 2.  使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters("storeDemo1",{
      aFlag1: 'getAFlag'
    }),
    // 也可以这样
    ...mapGetters({
      aFlag2: 'storeDemo1/getAFlag',
      vuexMsg: 'storeDemo1/msg',
      vuexText: 'storeDemo1/text',
      // 取出 某个 模块中的 getAFlag 函数返回的值,并且映射到 nFlag 上
      // nFlag: 'xxx/getAFlag',
    }),
    // 3.
    ...mapState("storeDemo1",{
      aFlag3:state => state.aFlag
    }),
  },
  methods: {
    /**
     * 修改存在 vuex 中的aFlag值
     */
    changeAFlag(){
      this.$store.commit('storeDemo1/changeAFlag');
    },

    changeMsg(isEndurance){
      // isEndurance 为 true时 进行数据持久化
      let msg = isEndurance ? 'Hi,我是欧可乐(进行持久化)':'Hello,我是oukele(不进行持久化)';
      let params =  {
        msg: msg,
        isEndurance: isEndurance
      }
      this.$store.commit('storeDemo1/changeMsg' , params);
    },

    changeText(){
      this.$store.dispatch('storeDemo1/changeText', { msg: 'action - text' })
    }

  }
}
</script>

<style scoped>
  .demo-body {
    width: 30%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  .demo-body .showText {
    background-color: blanchedalmond;
    padding-top: 10px;
    height: 150px;
  }
  .demo-body .operating {
    padding: 10px 0 10px 0;
    background-color: gray;
  }

</style>
