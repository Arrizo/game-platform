<template>
<div>
 <router-view></router-view>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'loyout',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
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
