<template>
  <div class="marquee-box">
    <!--广播-->
    <div class="broadcast"></div>
    <!--走马灯-->
    <div id="marqueeSwiper" class="marquee-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in marqueeSwiperArr" :key="'marquee'+index">
          <a v-if="checkUrl(item.marqueeLink)" @click="returnPage(item.marqueeLink, item.marqueeId,item.marqueeType, item.appName, item.id)">{{item.marqueeContent}}</a>
          <a v-else @click="linkTo(item.marqueeType, item.marqueeLink, item.id, item.marqueeId)">{{item.marqueeContent}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 跑马灯
* @module @/containers/Home/components/MarqueeSwiper
* @desc 首页home的跑马灯
* @author yang huiru
* @date 2018.5.30
* @example 调用示例
* <marquee-swiper></marquee-swiper>
*/
import { getMarqueeList, sendEvent2Server } from '@/services'
import gameStart from '@/utils/gameStart'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import * as canstVar from '@/config/const'

export default {
  name: 'MarqueeSwiper',
  extends: {},
  props: {
  },
  data () {
    return {
      marqueeSwiperArr: [],
      marqueeSwiper: null,
      marqueeSwiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // loop: true,
        direction: 'vertical',
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
  watch: {},
  methods: {
    // 获取跑马灯内容
    setMarqueeList () {
      const obj = {
      }
      getMarqueeList(obj).then(res => {
        this.marqueeSwiperArr = res.data.marqueeList
        this.marqueeSwiper.update(true)
      })
    },
    // 判断跑马灯链接url是否为空
    checkUrl (url) {
      let flag = url !== ''
      return flag
    },
    // url不为空的链接方法
    returnPage (url, marqueeId, marqueeType, appName, appId) {
      const obj = {
        targetId: marqueeId,
        eventName: 'h5_marquee',
        actionType: 'CLICK'
      }
      sendEvent2Server(obj)
      if (marqueeType === canstVar.MARQUEE_TYPE_GAME) {
        gameStart(this.isLogin, appId, appName, url, this)
      } else {
        this.$router.push({ name: 'ExternalIframeWrapper', query: { 'url': url, 'gameIcon': 'gameIcon' } })
      }
    },
    // url为空的链接方法
    linkTo (type, url, id, marqueeId) {
      const obj = {
        targetId: marqueeId,
        eventName: 'h5_marquee',
        actionType: 'CLICK'
      }
      sendEvent2Server(obj)
      const newUrl = this.spliceUrl(type, url, id)
      this.$router.push(newUrl)
    },
    // 不同类型的链接
    spliceUrl (type, url, id) {
      // TODO: 若果是完整的link 不能使用:to的方式
      // 0-游戏、1-公告、2-攻略、3-活动、4-链接
      let urlAfter = ''
      switch (parseInt(type)) {
        case 0:
          urlAfter = url
          break
        case 1:
          // '公告' + id
          urlAfter = { name: 'Information', query: { newsId: id, fromRouterName: 'Home' } }
          break
        case 2:
          // '攻略' + id
          urlAfter = { name: 'Information', query: { newsId: id, fromRouterName: 'Home' } }
          break
        case 3:
          // '活动' + id
          urlAfter = { name: 'Information', query: { newsId: id, fromRouterName: 'Home' } }
          break
        case 4:
          urlAfter = url
          break
      }
      return urlAfter
    }
  },
  beforeMount () { },
  mounted () {
    this.setMarqueeList()
    this.marqueeSwiper = new Swiper('#marqueeSwiper', this.marqueeSwiperOption)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.marquee-box {
  background-color: #ffffff;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #e0e0e0;
  .broadcast {
    float: left;
    margin-left: 9.6px;
    margin-top: 8px;
    width: 15px;
    height: 20px;
    background: url("../../../../assets/img/broadcast.png") no-repeat;
    background-size: 100%;
  }
  .marquee-swiper {
    float: left;
    margin-left: 10px;
    width: 269px;
    height: 30px;
    padding-right: 15px;
    overflow: hidden;
  }
  .marquee-swiper a {
    display: block;
    color: #565656;
    line-height: 30px;
    font-size: 11px;
    text-indent: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
