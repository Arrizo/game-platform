<template>
  <div class="game-bgcolor">
    <!--返回顶部-->
    <!-- 轮播图 -->
    <ghw-banner :location='1' />
    <!--列表-->
    <div class="list" ref="gameList" id="gameList">
      <!--页中导航栏-->
      <div class="nav-box-placeholder" id="navbard">
        <mt-navbar v-model="gameNavBar" :fixed="isNavBarFixed" class="nav-box">
          <div class="fiex-bar">
            <mt-tab-item id="gameNavBar1" class="nav-item" :class="{newest:isShowRDGameHot}">{{$t("message.miniApp.hotMiniApps")}}</mt-tab-item>
          </div>
          <div class="fiex-bar">
            <mt-tab-item id="gameNavBar2" class="nav-item " :class="{newest:isShowRDGameNew}">{{$t("message.miniApp.latestMiniApps")}}</mt-tab-item>
          </div>
          <div class="fiex-bar">
            <mt-tab-item id="gameNavBar3" class="nav-item ">{{$t("message.miniApp.miniAppsCategory")}}</mt-tab-item>
          </div>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="gameNavBar">
        <!-- 推荐列表 开始 -->
        <mt-tab-container-item id="gameNavBar1" class="rank-list">
          <hot-mini-apps @isCompleteHotGame="isShowLoadGifHot" v-show="!isShowLoadGif.hot" :loadHotNextPage="isLoadNextPage.hot" :isStartService="isStartNavBar1"></hot-mini-apps>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.hot"></ghw-load-gif>
        </mt-tab-container-item>
        <!-- 推荐列表 结束 -->
        <!-- 最新列表 开始 -->
        <mt-tab-container-item id="gameNavBar2">
          <latest-mini-apps @isCompleteLatestGame="isShowLoadGifLate" v-show="!isShowLoadGif.late" :loadLateNextPage="isLoadNextPage.late" :isStartService="isStartNavBar2"></latest-mini-apps>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.late"></ghw-load-gif>
        </mt-tab-container-item>
        <!-- 最新列表 结束 -->
        <!-- 资讯列表 开始 -->
        <mt-tab-container-item id="gameNavBar3">
          <mini-apps-category @isCompleteCateGame="isShowLoadGif.cate=false" v-show="!isShowLoadGif.cate" :isStartService="isStartNavBar3"></mini-apps-category>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.cate"></ghw-load-gif>
        </mt-tab-container-item>
        <!-- 资讯列表 结束 -->
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import GhwBanner from '@/components/GhwBanner'
import HotMiniApps from './HotMiniApps'
import LatestMiniApps from './LatestMiniApps'
import MiniAppsCategory from './MiniAppsCategory'
import { mapState } from 'vuex'
import iconPlayed from '@/assets/img/played_icon.png'
import iconList from '@/assets/img/list_icon.png'
import 'swiper/dist/css/swiper.min.css'
import GhwLoadGif from '@/components/GhwLoadGif'
import * as constVar from '@/config/const'

export default {
  name: 'Game',
  extends: {},
  props: {},
  data () {
    return {
      iconPlayed,
      iconList,
      isNavBarFixed: false,
      isSubNavBarFixed: false,
      gameNavBar: this.$route.params.tab ? this.$route.params.tab : 'gameNavBar1',
      scrollTopGameNavBar1: 0,
      scrollTopGameNavBar2: 0,
      scrollTopGameNavBar3: 0,
      bannerSwiper: null,
      marqueeSwiper: null,
      playedSwiper: null,
      // 是否显示加载中的鲸鱼效果
      isShowLoadGif: {
        hot: true,
        late: true,
        cate: true
      },
      // 是否加载下一页数据
      isLoadNextPage: {
        hot: false,
        late: false
      },
      gameListTop: 0,
      // 判断tab是否是第一次加载
      flagNavBar1: 0,
      flagNavBar2: 0,
      flagNavBar3: 0,
      // 向子组件发通知调接口
      isStartNavBar1: false,
      isStartNavBar2: false,
      isStartNavBar3: false
    }
  },
  computed: {
    ...mapState({
      count: state => state.user.count,
      isShowRDGameHot: state => state.redDotPush.redDotList[constVar.RED_DOT_GAME_HOT].hasRead,
      isShowRDGameNew: state => state.redDotPush.redDotList[constVar.RED_DOT_GAME_NEW].hasRead

    }),
    bannerSwiperArrComputed () {
      return this.bannerSwiperArr
    }
  },
  components: {
    HotMiniApps,
    LatestMiniApps,
    MiniAppsCategory,
    GhwBanner,
    GhwLoadGif
  },
  watch: {
    gameNavBar (newVal, oldVal) {
      const self = this
      this.focusTab()
      var ele = document.getElementById('innerWrapper')
      const scrollTop = ele.pageYOffset || ele.scrollTop
      // if (newVal === oldVal) return
      if (self.isNavBarFixed) {
        switch (oldVal) {
          case 'gameNavBar1':
            self.scrollTopGameNavBar1 = scrollTop
            break
          case 'gameNavBar2':
            self.scrollTopGameNavBar2 = scrollTop
            break
          case 'gameNavBar3':
            this.scrollTopGameNavBar3 = scrollTop
            break
        }
        switch (newVal) {
          case 'gameNavBar1':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopGameNavBar1
                } catch (error) {
                  ele.scrollTop = self.scrollTopGameNavBar1
                }
              }, 10
            )
            break
          case 'gameNavBar2':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopGameNavBar2
                } catch (error) {
                  ele.scrollTop = self.scrollTopGameNavBar2
                }
              }, 10
            )
            break
          case 'gameNavBar3':
            // 添加延时操作，防止列表渲染未完成就开始滚动
            setTimeout(
              function () {
                try {
                  ele.offsetTop = self.scrollTopGameNavBar3
                } catch (error) {
                  ele.scrollTop = self.scrollTopGameNavBar3
                }
              }, 10
            )
            break
        }
      }
      // 判断当前打开的页面
      if (newVal === 'gameNavBar1') {
        this.$store.dispatch('changeRedDotStatus', {redDotLoca: constVar.RED_DOT_GAME_HOT})
      } else if (newVal === 'gameNavBar2') {
        this.$store.dispatch('changeRedDotStatus', {redDotLoca: constVar.RED_DOT_GAME_NEW})
      }
    }
  },
  methods: {
    init () {
      document.getElementById('innerWrapper').addEventListener('scroll', this.changeNavBoxStatue)
      this.gameListTop = this.$refs.gameList.offsetTop || 0
      this.scrollTopGameNavBar1 = this.$refs.gameList.offsetTop || 0
      this.scrollTopGameNavBar2 = this.$refs.gameList.offsetTop || 0
      this.scrollTopGameNavBar3 = this.$refs.gameList.offsetTop || 0
    },
    // 是否显示热门列表的鲸鱼
    isShowLoadGifHot () {
      this.isShowLoadGif.hot = false
      this.isLoadNextPage.hot = false
    },
    // 是否显示最新列表的鲸鱼
    isShowLoadGifLate () {
      this.isShowLoadGif.late = false
      this.isLoadNextPage.late = false
    },
    // 判断加载哪个tab的接口
    focusTab () {
      switch (this.gameNavBar) {
        case 'gameNavBar1':
          if (this.flagNavBar1 === 0) {
            this.isStartNavBar1 = true
            this.flagNavBar1++
          }
          break
        case 'gameNavBar2':
          if (this.flagNavBar2 === 0) {
            this.isStartNavBar2 = true
            this.flagNavBar2++
          }
          break
        case 'gameNavBar3':
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
      if (this.gameListTop <= scrollTop) {
        this.isNavBarFixed = true
        this.isSubNavBarFixed = true
      } else {
        this.isNavBarFixed = false
        this.isSubNavBarFixed = false
      }
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (this.gameNavBar === 'gameNavBar1' && !this.isShowLoadGif.hot) {
          this.isLoadNextPage.hot = true
        }
        if (this.gameNavBar === 'gameNavBar2' && !this.isShowLoadGif.late) {
          this.isLoadNextPage.late = true
        }
      }
    }
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
    if (this.gameNavBar === 'gameNavBar1') {
      this.$store.dispatch('changeRedDotStatus', {redDotLoca: constVar.RED_DOT_GAME_HOT})
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
// .game-bgcolor {
//   background: rgb(238, 238, 238);
// }
/*列表*/
.list {
  width: 100%;
  min-height: 335px;
}
/*一级导航栏*/
.nav-box-placeholder {
  width: 100%;
  height: 40px;
  margin-top: 7px;
}
.nav-box {
  width: 100%;
  height: 40px;
  // border: 1px solid rgba(241, 241, 241, 1);
}
.mint-tab-container {
  // background: #F6F6F6;
}
.newest::before {
  right: 30px;
  top: 10px;
}
.fiex-bar {
  position: relative;
  flex: 1;
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
.nav-item2 {
  width: 50%;
}
.nav-item3 {
  width: 100%;
  text-align: center;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .newest::before {
  right: 34%;
  top: 10px;
}
}
</style>
