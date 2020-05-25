<template>
  <div class="top-box">
    <template v-if="isSlideshow">
      <!--轮播图-->
      <div id="bannerSwiper" class="banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerSwiperArr" :key="'banner'+index">
            <a @click="playGame(item.appLink,item.appId,item.appName,item.slideshowId)"><img :src="item.slideshowImage"></a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </template>
    <template v-else>
      <!-- 预留；游戏详情内的banner位置有可能改成轮播图 -->
      <img class="top-bg" :src="bannerSwiperArr[0]">
    </template>
  </div>
</template>

<script>
/**
* 头部滚动图
* @module src/components/GhwBanner
* @desc 项目内的滚动图，二次封装，基于swiper进行二次封装
* @author Dicky_L
* @date 2018-3-20
* @param {Number} [location] --- 轮播图所在的位置
* @param {Boolean} [isSlideshow] --- 判断是否滚动图
* @example 调用示例
*   <ghw-banner :location="0" />
*/

import Swiper from 'swiper'
// 尽量避免使用解构方式导入
import * as services from '@/services'
import { mapState } from 'vuex'
import gameStart from '@/utils/gameStart'
// 资源文件导入放在最下面
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'GhwBanner',
  props: {
    location: {
      type: Number,
      default: 0
    },
    isSlideshow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      parentData: 0,
      bannerSwiperArr: [],
      bannerSwiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          element: 'li',
          clickable: true
        },
        observer: true
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {},
  methods: {
    setSlideList () {
      const obj = {
        location: this.location,
        pageSize: '5',
        page: '1'
      }
      const self = this
      services.getSlideList(obj).then(res => {
        // TODO: 优化动态变化swiper的元素，swiper API文档：http://www.swiper.com.cn/api/methods/257.html
        self.$nextTick(function () {
          self.bannerSwiperArr = res.data.slideshowList
          self.bannerSwiper = new Swiper('#bannerSwiper', this.bannerSwiperOption)
        })
      })
    },
    playGame (url, appId, appName, slideshowId) {
      console.log('--------------targetId:', slideshowId)
      const obj = {
        appId,
        targetId: slideshowId,
        eventName: 'h5_slideshow',
        actionType: 'CLICK'
      }
      // 埋点接口
      services.sendEvent2Server(obj)
      // 游戏开始公共方法
      gameStart(this.isLogin, appId, appName, url, this)
    }
  },
  // 生命周期
  beforecreated () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {
    this.setSlideList()
  },
  beforeUpdate () {

  },
  update () {

  },
  beforeDestroy () {

  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
/*头部 轮播图*/
.top-box {
  position: relative;
  width: 100%;
  height: 170px;
  .top-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    z-index: 0;
  }
  .banner-swiper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & /deep/ .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      opacity: 0.4;
      background: #ffffff;
    }
    & /deep/ .swiper-pagination-bullet-active {
      background: #1787dd;
      opacity: 0.9;
    }
    .swiper-slide a img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
