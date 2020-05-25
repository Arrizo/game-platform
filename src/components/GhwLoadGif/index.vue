<template>
  <div v-if="isShowLoadGif">
    <div class="load-style">
      <img :src="loadSrc">
    </div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwLoadGif
* @desc 带“更多”按钮的标题栏及普通标题栏
* @author yang huiru
* @date 2018.5.31
* @param {Boolean} [isShowLoadGif] - 是否显示鲸鱼
* @example 调用示例
* <ghw-load-gif :isShowLoadGif="isShowLoadGif.recommendationList"></ghw-load-gif>
*/
import loadGif from '@/assets/img/loading-fish.gif'
import loadSvg from '@/assets/img/loading-fish.svg'
import platform from 'platform'
export default {
  name: 'GhwLoadGif',
  extends: {},
  props: {
    isShowLoadGif: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loadGif,
      loadSvg,
      screenHeight: '500px',
      loadSrc: ''
    }
  },
  computed: {
  },
  components: {},
  watch: {},
  methods: {

  },
  created () {
    if (~platform.name.indexOf('IE')) {
      this.loadSrc = this.loadGif
    } else {
      this.loadSrc = this.loadSvg
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
//加载中gift的样式
// .load-style {
//   width: 100%; // height:  100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
// }
.load-style img {
  display: block;
  width: 110px;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
