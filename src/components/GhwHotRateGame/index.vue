<template>
  <ul>
    <li class="hot-item" v-for="(item,index) in hotItemsArr" :key="'hotItem'+index">
      <a @click.stop="playHotGame($event,item.appUrl,item.appId,item.appName)">
        <img :src="item.appIconUrl">
        <span>{{item.appName}}</span>
      </a>
    </li>
  </ul>
</template>
<script>
/**
* 热门小游戏平铺
* @module @/components/GhwHotRateGame
* @desc 热门下推荐和热门下的小游戏平铺
* @author
* @date 2018.5.30
* @param {Array} [hotItemsArr]    - 平铺游戏数组,必传
* @example 调用示例
* <ghw-hot-rate-game :hotItemsArr="hotItemsArr"></ghw-hot-rate-game>
*/
import gameStart from '@/utils/gameStart'
import { mapState } from 'vuex'
export default {
  name: 'GhwHotRateGame',
  extends: {},
  props: {
    hotItemsArr: {
      type: Array,
      defaul: () => {
        return [
        ]
      }
    }
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isPlaying: state => state.user.isPlaying
    })
  },
  components: {},
  watch: {},
  methods: {
    playHotGame (event, url, appId, appName) {
      gameStart(this.isLogin, appId, appName, url, this)
    }
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
  position: relative;
  width: 100%;
  min-height: 100px;
  border-bottom: 1px solid #e0e0e0;
}
.hot-item {
  float: left;
  margin-left: 22.784px;
  width: 51.52px;
  height: 67.6px;
  margin-bottom: 5px;
  cursor: pointer;
}
.hot-item img {
  height: 51.6px;
  border-radius: 10px;
}
.hot-item span {
  display: inline-block;
  width: 51.52px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
