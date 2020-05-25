<template>
  <div class="game-icon" :class="['game-icon-'+appIconSize]">
    <img :src="appIconUrl" alt="" :class="appIconUrlClass">
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwGameIcon
* @desc 游戏的头像
* @author yang huiru
* @date 2018.5.30
* @param {String} [appIconUrl]    - 游戏icon的url,必传
* @param {String} [appIconUrlClass] - 游戏icon的样式,可选
* @param {String} [appIconSize] - 游戏icon的大小,可选
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
export default {
  name: 'GhwGameIcon',
  extends: {},
  props: {
    appIconUrl: {
      type: String,
      default: ''
    },
    appIconUrlClass: {
      type: String,
      default: ''
    },
    appIconSize: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {},
  watch: {},
  methods: {

  },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.game-icon-small {
  width: 39px;
  height: 39px;
  border-radius: 7px;
  overflow: hidden;
  display: inline-block;
  img{
    width: 100%;
  }
}
.game-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.game-icon-large {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
