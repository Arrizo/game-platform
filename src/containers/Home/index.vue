<template>
  <div style="overflow:hidden;">
    <!--返回顶部-->
    <!-- 轮播图 -->
    <ghw-banner :location="0" />
    <!-- 跑马灯 -->
    <marquee-swiper></marquee-swiper>
    <!--我玩过的-->
    <played-game-cont></played-game-cont>
    <!--列表-->
    <div class="list" ref="gameList">
      <!--页中导航栏-->
      <div class="nav-box-placeholder">
        <mt-navbar v-model="navBar" :fixed="isNavBarFixed" class="nav-box">
          <div class="fiex-bar">
            <mt-tab-item id="navBar1" class="nav-item" :class="{newest:isShowRDHomeBest}">{{$t("message.homepage.recommendApps")}}</mt-tab-item>
          </div>
          <div class="fiex-bar">
            <mt-tab-item id="navBar2" class="nav-item " :class="{newest:isShowRDHomeNew}">{{$t("message.homepage.latestApps")}}</mt-tab-item>
          </div>
          <div class="fiex-bar">
            <mt-tab-item id="navBar3" class="nav-item " :class="{newest:isRedDotHomeInfo}">{{$t("message.homepage.news")}}</mt-tab-item>
          </div>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="navBar">
        <!-- 推荐列表 开始 -->
        <mt-tab-container-item id="navBar1" class="rank-list">
          <recommendation-list @isShowLoadGif="isShowLoadGifRec" v-show="!isShowLoadGif.recommendationList" :isLoadNextPage="isLoadNextPage.recommendationList" @isNoMoreData="isNoMoreDataRec" :isStartService="isStartNavBar1"></recommendation-list>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.recommendationList"></ghw-load-gif>
          <!-- 隐私政策 -->
          <div class="privacy" v-if="!isShowLoadGif.recommendationList">
            <a href="#" class="privacy" @click="isShowPolicy=true">{{$t('message.buoy.privacy.privacyControl')}}</a>
          </div>
        </mt-tab-container-item>
        <!-- 推荐列表 结束 -->
        <!-- 最新列表 开始 -->
        <mt-tab-container-item id="navBar2">
          <latest-list @isShowLoadGif="isShowLoadGifLate" v-show="!isShowLoadGif.latestList" :isLoadNextPage="isLoadNextPage.latestList" @isNoMoreData="isNoMoreDataLate" :isStartService="isStartNavBar2"></latest-list>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.latestList"></ghw-load-gif>
          <!-- 隐私政策 -->
          <div class="privacy" v-if="!isShowLoadGif.latestList">
            <a href="#" class="privacy" @click="isShowPolicy=true">{{$t('message.buoy.privacy.privacyControl')}}</a>
          </div>
        </mt-tab-container-item>
        <!-- 最新列表 结束 -->
        <!-- 资讯列表 开始 -->
        <mt-tab-container-item style="position:relative" id="navBar3">
          <information-list :isSubNavBarFixed="isSubNavBarFixed" :isLoadNextPage="isLoadNextPage.info" @isShowLoadGifNews="isLoadNextPage.info=false" @isShowLoadGifEvent="isLoadNextPage.info=false" :navTabScrollTop="scrollTopNavBar3" :gameListOffsetTop="gameListTop" :isStartService="isStartNavBar3" :navBar="navBar"></information-list>
        </mt-tab-container-item>
        <!-- 资讯列表 结束 -->
      </mt-tab-container>
    </div>
    <privacy-policy :isShowPolicy="isShowPolicy" @closePolicy="isShowPolicy=false" :privacyUrl="'https://www.chipsgames.com/privacy/privacy_and_cookie_policy.html'"></privacy-policy>
  </div>
</template>
<script>
import GhwBanner from '@/components/GhwBanner'
import MarqueeSwiper from '@/containers/Home/components/MarqueeSwiper'
import PlayedGameCont from '@/containers/Home/components/PlayedGameCont'
import RecommendationList from '@/containers/Home/RecommendationList'
import LatestList from '@/containers/Home/LatestList'
import InformationList from '@/containers/Home/InformationList'
import { mapState } from 'vuex'
import GhwReturnTop from '@/components/GhwReturnTop'
import * as postMessageEvent from '@/config/postMessageEvent'
import iconPlayed from '@/assets/img/played_icon.png'
import iconList from '@/assets/img/list_icon.png'
import GhwLoadGif from '@/components/GhwLoadGif'
import PrivacyPolicy from '@/components/GhwPopUp/components/PrivacyPolicy.vue'
import { API_PATH } from '@/config/env'
import * as constVar from '@/config/const'

export default {
  name: 'Home',
  extends: {},
  props: {},
  data () {
    return {
      iconPlayed,
      iconList,
      isNavBarFixed: false,
      isSubNavBarFixed: false,
      navBar: this.$route.params.tab || this.$route.query.tab || 'navBar1',
      scrollTopNavBar1: 0,
      scrollTopNavBar2: 0,
      scrollTopNavBar3: 0,
      // 判断tab是否是第一次加载
      flagNavBar1: 0,
      flagNavBar2: 0,
      flagNavBar3: 0,
      // 向子组件发通知调接口
      isStartNavBar1: false,
      isStartNavBar2: false,
      isStartNavBar3: false,
      bannerSwiper: null,
      myBarOption: {
        barColor: 'red',
        barWidth: 6,
        railColor: '#eee'
      },
      // 是否显示加载中的鲸鱼效果
      isShowLoadGif: {
        recommendationList: true,
        latestList: true
      },
      // 是否加载下一页数据
      isLoadNextPage: {
        recommendationList: false,
        latestList: false,
        info: false
      },
      // 是否无更多数据
      isNoMoreData: {
        recommendationList: true,
        latestList: true
      },
      wrapperHeight: 0,
      gameListTop: 0,
      isShowPolicy: false,
      API_PATH
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isShowRDHomeBest: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_BEST].hasRead,
      isShowRDHomeNew: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_NEW].hasRead,
      isShowRDHomeInfoNew: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_NEWS].hasRead,
      isShowRDHomeInfoEvent: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_EVENT].hasRead

    }),
    bannerSwiperArrComputed () {
      return this.bannerSwiperArr
    },
    isRedDotHomeInfo: function () {
      return this.isShowRDHomeInfoNew || this.isShowRDHomeInfoEvent
    }
  },
  components: {
    RecommendationList,
    LatestList,
    InformationList,
    GhwBanner,
    MarqueeSwiper,
    PlayedGameCont,
    GhwReturnTop,
    GhwLoadGif,
    PrivacyPolicy
  },
  watch: {
    navBar (newVal, oldVal) {
      var self = this
      this.focusTab()
      var ele = document.getElementById('innerWrapper')
      var scrollTop = ele.pageYOffset || ele.scrollTop
      if (self.isNavBarFixed) {
        switch (oldVal) {
          case 'navBar1':
            self.scrollTopNavBar1 = scrollTop
            break
          case 'navBar2':
            self.scrollTopNavBar2 = scrollTop
            break
          case 'navBar3':
            self.scrollTopNavBar3 = scrollTop
            break
        }
        switch (newVal) {
          case 'navBar1':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopNavBar1
                } catch (error) {
                  ele.scrollTop = self.scrollTopNavBar1
                }
              }, 10
            )
            break
          case 'navBar2':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopNavBar2
                } catch (error) {
                  ele.scrollTop = self.scrollTopNavBar2
                }
              }, 10
            )
            break
          case 'navBar3':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopNavBar3
                } catch (error) {
                  ele.scrollTop = self.scrollTopNavBar3
                }
              }, 10
            )
            break
        }
      }
      // 判断当前打开的页面
      if (newVal === 'navBar1') {
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_BEST })
      } else if (newVal === 'navBar2') {
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_NEW })
      }
    }
  },
  methods: {
    init () {
      console.log('isShowRDHomeBest:::', this.isShowRDHomeBest)
      document.getElementById('innerWrapper').addEventListener('scroll', this.changeNavBoxStatue)
      this.addListener()
      this.gameListTop = this.$refs.gameList.offsetTop || 0
      this.scrollTopNavBar1 = this.$refs.gameList.offsetTop || 0
      this.scrollTopNavBar2 = this.$refs.gameList.offsetTop || 0
      this.scrollTopNavBar3 = this.$refs.gameList.offsetTop || 0
    },
    // 是否显示推荐列表的鲸鱼
    isShowLoadGifRec (data) {
      this.isShowLoadGif.recommendationList = data
      this.isLoadNextPage.recommendationList = false
    },
    // 是否显示最新列表的鲸鱼
    isShowLoadGifLate (data) {
      this.isShowLoadGif.latestList = data
      this.isLoadNextPage.latestList = false
    },
    // 推荐列表是否无更多数据
    isNoMoreDataRec (data) {
      this.isNoMoreData.recommendationList = data
    },
    // 最新推荐列表是否无更多数据
    isNoMoreDataLate (data) {
      this.isNoMoreData.latestList = data
    },
    // 判断加载哪个tab的接口
    focusTab () {
      switch (this.navBar) {
        case 'navBar1':
          if (this.flagNavBar1 === 0) {
            this.isStartNavBar1 = true
            this.flagNavBar1++
          }
          break
        case 'navBar2':
          if (this.flagNavBar2 === 0) {
            this.isStartNavBar2 = true
            this.flagNavBar2++
          }
          break
        case 'navBar3':
          if (this.flagNavBar3 === 0) {
            this.isStartNavBar3 = true
            this.flagNavBar3++
          }
          break
      }
    },
    // 监听滚动事件
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      // 玩过游戏后不相等，重置gameListTop的值
      var gameListTop = this.gameListTop
      try {
        gameListTop = this.$refs.gameList.offsetTop
      } catch (e) {
      }
      if (this.gameListTop !== gameListTop) {
        this.gameListTop = gameListTop
      }
      if (this.gameListTop <= scrollTop) {
        if (!this.isNavBarFixed && !this.isSubNavBarFixed) {
          this.isNavBarFixed = true
          this.isSubNavBarFixed = true
        }
      } else {
        this.isNavBarFixed = false
        this.isSubNavBarFixed = false
      }
      // 当滚动到底部自动加载下一页
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (this.navBar === 'navBar1' && !this.isLoadNextPage.recommendationList) {
          this.isLoadNextPage.recommendationList = true
        }
        if (this.navBar === 'navBar2' && !this.isLoadNextPage.latestList) {
          this.isLoadNextPage.latestList = true
        }
        if (this.navBar === 'navBar3') {
          this.isLoadNextPage.info = true
        }
      }
    },
    // 监听postMessageEvent的事件
    addListener () {
      const self = this
      const doSth = {
        [postMessageEvent.SHOW_INFORMAITON] () {
          self.navBar = 'navBar3'
        },
        [postMessageEvent.HOME] () {
          self.navBar = 'navBar1'
        }
      }
      window.addEventListener('message', function (e) {
        try {
          let cmd = JSON.parse(e.data).cmd
          if (doSth[cmd]) {
            doSth[cmd]()
          }
        } catch (error) {
          console.warn('Unknown message received, drop it...')
        }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.navBar = to.params.tab
  },
  beforeMount () { },
  mounted () {
    this.init()
    this.focusTab()
    var ele = document.getElementById('innerWrapper')

    try {
      ele.offsetTop = 0
    } catch (error) {
      ele.scrollTop = 0
    }
    if (this.navBar === 'navBar1') {
      this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_BEST })
    }
  },
  beforeUpdate () {

  },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss">
// 公共class
.hot-game {
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
/*超出隐藏*/
.played-icon span,
.hot_item span {
  display: block;
  width: 100%;
  height: 16px;
  line-height: 16px;
  color: #565656;
  font-size: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
/*列表*/
.list {
  width: 100%;
  min-height: 300px;
}
/*一级导航栏*/
.nav-box-placeholder {
  width: 100%;
  height: 40px;
  margin-top: 7px;
}
.fiex-bar {
  position: relative;
  flex: 1;
}
.newest::before {
  right: 33px;
  top: 10px;
}
.nav-box {
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(241, 241, 241, 1);
}
.nav-box .nav-item {
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: rgba(51, 51, 51, 1);
  .mint-tab-item-label {
    height: 13px;
    font-size: 16px;
    line-height: 12px;
    color: rgba(51, 51, 51, 1);
    line-height: 12px;
    margin-top: -4px;
  }
}
.nav-box .nav-item.is-selected {
  font-size: 16px;
  border-bottom: none !important;
  .mint-tab-item-label {
    color: rgba(23, 135, 221, 1);
  }
}
.nav-box .nav-item.is-selected::after {
  content: '';
  display: block;
  width: 13px;
  height: 2px;
  margin: auto;
  background: rgba(23, 135, 221, 1);
  margin-top: 10px;
}
.mint-navbar.is-fixed {
  box-shadow: 0 2px 5px #ebebeb;
}
.nav-item2 {
  width: 50%;
}
.nav-item3 {
  width: 100%;
  text-align: center;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .marquee-box .marquee-swiper {
    width: 90%;
  }
  .newest::before {
    right: 34%;
    top: 10px;
  }
}
.privacy {
  margin: 15px 0;
  text-align: center;
  a {
    height: 10px;
    line-height: 10px;
    text-decoration: underline;
    font-size: 9px;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
