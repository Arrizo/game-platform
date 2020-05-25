<template>
  <div class="hot-game clearfix">
    <ghw-block-title :titleName="titleName" :routerName="routerName"></ghw-block-title>
    <ghw-hot-rate-game :hotItemsArr="hotItemsArr">
    </ghw-hot-rate-game>
  </div>
</template>
<script>
/**
* 热门小游戏
* @module  @/containers/Home/components/HotGameCont
* @desc 首页-推荐 首页-最新的热门小游戏
* @author yang huiru
* @date 2018.5.30
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,必传
* @param {Array} [hotItemsArr] - 热门游戏内容,必传
* @example 调用示例
* <hot-game-cont :titleName="$t('message.homepage.hotMiniApps')" :routerName="{ name: 'Game', params: { tab: 'gameNavBar1'} }" :hotItemsArr="hotItemsArr1"></hot-game-cont>
*/
import GhwHotRateGame from '@/components/GhwHotRateGame'
import GhwBlockTitle from '@/components/GhwBlockTitle'
export default {
  name: 'HotGameCont',
  extends: {},
  props: {
    titleName: {
      type: String,
      default: ''
    },
    routerName: {
      type: Object,
      default () {
        return {}
      }
    },
    hotItemsArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    GhwHotRateGame,
    GhwBlockTitle
  },
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
.hot-game {
  margin: 7px 0;
  background: #fff;
}
</style>
