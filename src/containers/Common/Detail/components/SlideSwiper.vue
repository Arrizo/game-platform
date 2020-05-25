<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in swiperArr" :key="'slide'+index">
        <div class="slide-box">
          <img :src="item">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/containers/Common/Detail/components/SlideSwiper.vue
* @desc 图片滑动组件
* @author yang huiru
* @date 2018.8.20
* @param {array} [swiperArr]    - 图片数组
* @example 调用示例
* <slide-swiper></slide-swiper>
*/
import Swiper from 'swiper'
// 资源文件导入放在最下面
import 'swiper/dist/css/swiper.min.css'
// import * as services from '@/services'
export default {
  name: 'SlideSwiper',
  extends: {},
  props: {
    isLoadedSlide: {
      type: Boolean,
      default () {
        return false
      }
    },
    swiperArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      slideSwiper: null,
      swiperOption: {
        // 可选选项，自动滑动
        // autoplay: false,
        // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        direction: 'horizontal',
        mousewheel: false,
        slidesOffsetBefore: 12,
        slidesOffsetAfter: 12,
        spaceBetween: 5,
        slidesPerView: 1.08,
        initialSlide: 0,
        observer: true
      }
    }
  },
  computed: {
  },
  components: {},
  watch: {
    isLoadedSlide (val) {
      if (val) {
        let self = this
        this.$nextTick(function () {
          self.slideSwiper = new Swiper('.swiper-container', self.swiperOption)
        })
      }
    }
  },
  methods: {
  },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () {

  },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
// .swiper-container {
  .slide-box {
    width: 100%;
    height: 157px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
// }
</style>
