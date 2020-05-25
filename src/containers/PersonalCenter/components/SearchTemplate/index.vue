<template>
<div>
<mt-search v-model="value" :autofocus='true' :show='true'>
  <mt-cell v-for="(item,index) in result" :title="item.appName" :key="'cell'+index" cancel-text="取消"
  placeholder="搜索" :to="{name:'ServiceMain',params:{'appName':item.appName,'appId':item.appId}}">
  </mt-cell>
</mt-search>
</div>
</template>
<script>
import { getGameNameList } from '@/services'
import { mapState } from 'vuex'
export default {
  name: 'SearchTemplate',
  data () {
    return {
      result: [],
      value: ''
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj
    })
  },
  watch: {
    value () {
      this.fetchData()
    }
  },
  methods: {
    fetchData (data) {
      var word = this.value
      let obj = {}
      if (word === '') {
        obj = {
          userToken: this.userObj.h5Token,
          page: this.page,
          pageSize: this.pageSize,
          v: new Date().getTime()
        }
      } else {
        obj = {
          userToken: this.userObj.h5Token,
          page: this.page,
          pageSize: this.pageSize,
          appName: word,
          v: new Date().getTime()
        }
      }
      word = word.replace(/'/g, '') // 去除单引号
      // this.keyWord = word
      // this.isGame = true
      console.log(word)
      getGameNameList(obj).then(res => {
        if (res.data) {
          console.log('res.data.appList.length:', res.data.appList.length)
          // 没有数据时或没更多数据时隐藏load按钮
          this.result = res.data.appList
        }
        // 判断如果是输入的值与列表有匹配，进行id赋值
        let dataList = res.data.appList
        for (let i = 0; i < dataList.length; i++) {
          if (word === dataList[i].appName) {
            this.serverAddArr.appId = dataList[i].appId
          }
        }
      }, error => {
        console.log(error)
      })
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    this.fetchData()
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }

}
</script>

<style lang="sass" scoped>

</style>
