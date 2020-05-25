<template>
  <div>
    <div class="game-detail">
      <div class="fixed-box" :class="{'show-border-bottom': isScrolling}">
        <div class="game-detail-header" :class="{'show-border-bottom': !isScrolling}">
          <div class="header-left">
            <img :src="appIcon" alt="">
          </div>
          <div class="header-right">
            <p class="header-right-title" :class="{'content-flow': isShowEllipsis}">{{appDetail.appName}}</p>
            <p class="header-right-star">
              <i class="iconfont icon-star-solid" v-for="(item,index) in parseInt(appRate)" :key="'iconStarSolid'+index"></i>
              <i class="iconfont icon-star-empty not-shiny" v-for="(item,index) in (5-parseInt(appRate))" :key="'iconStarEmpty'+index"></i>
            </p>
            <div class="header-right-content">
              <div class="game-label">{{appDetail.appType}}</div>
              <div class="game-popularity">
                <span>{{$t("message.miniApp.popularity")}}：</span>
                <span>{{appDetail.appPopularity|popularity}}</span>
              </div>
              <ghw-btn :inputType="'button'" :inputValue="$t('message.public.play')" :size="'public'" :type="'ellipse'" @triggerEvent="playGame"></ghw-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="game-detail-description">
        <p class="description-title">{{$t("message.public.appInfo")}}</p>
        <div class="description-content" :class="{'content-flow': isOverflowText&&isShowText,'show-all-content':!isShowText}">{{appDetail.appDesc}} </div>
        <p class="description-trigger" v-if="isOverflowText">
          <span v-if="isShowText" @click="isShowText=false">{{$t("message.public.show")}}</span>
          <span v-if="!isShowText" @click="isShowText=true">{{$t("message.public.hide")}}</span>
        </p>
      </div>
      <slide-swiper :isLoadedSlide="isCompleteRequest" :swiperArr="swiperArr"></slide-swiper>
      <!--列表-->
      <div class="detail-list" ref="gameDetailList">
        <!--页中导航栏-->
        <div class="detail-placeholder" v-if="isShowModel">
          <mt-navbar v-model="navBar">
            <div class="fiex-bar">
              <mt-tab-item id="navBar1" class="nav-item">{{$t("message.homepage.recommendApps")}}</mt-tab-item>
            </div>
            <div class="fiex-bar">
              <mt-tab-item id="navBar2" class="nav-item">{{$t("message.homepage.latestApps")}}</mt-tab-item>
            </div>
          </mt-navbar>
        </div>
        <mt-tab-container v-model="navBar">
          <!-- 推荐列表 开始 -->
          <mt-tab-container-item id="navBar1" v-if="isShowModel">
            <!-- <recommendation-list @isShowLoadGif="isShowLoadGifRec" v-show="!isShowLoadGif.recommendationList" :isLoadNextPage="isLoadNextPage.recommendationList" @isNoMoreData="isNoMoreDataRec" :isStartService="isStartNavBar1"></recommendation-list>
          <ghw-load-gif :isShowLoadGif="isShowLoadGif.recommendationList"></ghw-load-gif> -->
          </mt-tab-container-item>
          <!-- 推荐列表 结束 -->
          <!-- 资讯列表 开始 -->
          <mt-tab-container-item id="navBar2">
            <!-- <information-list :isLoadNextPage="isLoadNextPage.info" @isShowLoadGifNews="isLoadNextPage.info=false" @isShowLoadGifEvent="isLoadNextPage.info=false" :navTabScrollTop="scrollTopNavBar3" :gameListOffsetTop="gameListTop" :isStartService="isStartNavBar3" :navBar="navBar"></information-list> -->
            <detail-information></detail-information>
          </mt-tab-container-item>
          <!-- 资讯列表 结束 -->
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>
<script>
// import { getAppDetail, getAppNewsList } from '@/services'
import GhwIconMore from '@/components/GhwIconMore'
import gameStart from '@/utils/gameStart'
import { mapState } from 'vuex'
import CookieUtil from '@/utils/CookieUtil'
import GhwBtn from '@/components/GhwBtn'
import GhwConsultingItem from '@/components/GhwConsultingItem'
import GhwNoContent from '@/components/GhwNoContent'
import GhwLoadGif from '@/components/GhwLoadGif'
import iconStarFill from '@/assets/img/star2.png'
import iconStarHollow from '@/assets/img/star.png'
import SlideSwiper from '@/containers/Common/Detail/components/SlideSwiper'
import * as services from '@/services'
import DetailInformation from '@/containers/Common/Detail/components/DetailInformation'
// 节流函数
// const delay = (function () {
//   let timer = 0
//   return function (callback, ms) {
//     clearTimeout(timer)
//     timer = setTimeout(callback, ms)
//   }
// })()
export default {
  name: 'Detail',
  extends: {},
  props: {},
  data () {
    return {
      appNewsPage: 1,
      appNewsPageSize: 10,
      appIcon: '',
      appId: this.$route.query.appId,
      isLoadMoreShow: true,
      appDetail: {
        appPopularity: 0
      },
      appNewsArr: [],
      playCountDesc: '',
      showMore: true,
      showloadMore: false,
      isNoMoredata: false,
      loadNextPage: false,
      appBanner: '',
      isShowLoadGif: true,
      iconStarFill,
      iconStarHollow,
      appRate: 0,
      navBar: 'navBar2',
      isShowModel: false,
      isOverflowText: false,
      isShowText: true,
      isCompleteRequest: false,
      swiperArr: [],
      isScrolling: false,
      isShowEllipsis: false
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isPlaying: state => state.user.isPlaying
    })
  },
  components: {
    GhwIconMore,
    GhwBtn,
    GhwConsultingItem,
    GhwNoContent,
    GhwLoadGif,
    SlideSwiper,
    DetailInformation
  },
  watch: {
  },
  methods: {
    // 开始游戏
    playGame () {
      gameStart(this.isLogin, this.appId, '', '', this)
    },
    // 获取游戏的具体信息
    setAppDetail () {
      var obj = {}
      var userId = CookieUtil.getInstance().getSdkUserIdFromCookie()
      if (userId) {
        obj = {
          appId: this.$route.query.appId,
          userId: userId
        }
      } else {
        obj = {
          appId: this.$route.query.appId
        }
      }
      services.getAppDetail(obj).then(res => {
        this.appDetail = res.data
        this.appIcon = this.appDetail.appIconUrl
        this.appRate = this.appDetail.appRate
        this.swiperArr = this.appDetail.appBannerUrl
        var contentElem = document.getElementsByClassName('description-content')[0]
        var appNameElem = document.getElementsByClassName('header-right-title')[0]
        this.isCompleteRequest = true
        this.$nextTick(function () {
          // if (contentElem.scrollHeight > contentElem.clientHeight)
          // 内容高度加1使为了兼容ie浏览器，没溢出文本时，滚动高度总是比内容高度大1
          if (contentElem.scrollHeight > contentElem.clientHeight + 1) {
            this.isOverflowText = true
          }
          if (appNameElem.scrollHeight > appNameElem.clientHeight + 1) {
            this.isShowEllipsis = true
          }
        })
      })
    },
    dealGameDetailScroll () {
      let scrollTop = document.getElementById('innerWrapper').scrollTop
      if (scrollTop > 0) {
        this.isScrolling = true
      } else {
        this.isScrolling = false
      }
    }
  },
  created () {
    this.setAppDetail()
  },
  beforeMount () { },
  mounted () {
    document.getElementById('innerWrapper').addEventListener('scroll', this.dealGameDetailScroll)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () {
    document.getElementById('innerWrapper').removeEventListener('scroll', this.dealGameDetailScroll)
  }
}
</script>
<style lang="scss" scoped>
.game-detail {
  background-color: #fff;
  // margin-bottom: 10px;
}
.content-flow::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  // padding-left:5px;
  padding-right: 10px;
  background: #fff;
}
.fixed-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  // height: 107px;
  background-color: #fff;
  z-index: 2;
  padding-left: 12px;
  // &.show-border-bottom{
  //   height: 108px;
  // }
}
.game-detail-header {
  width: 100%;
  height: 107px;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 0.5px solid #eeeeee;
  padding-right: 12px;
  &.show-border-bottom {
    height: 107.5px;
  }
  .header-left {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 5px;
    img {
      width: 75px;
    }
  }
  .header-right {
    flex: 1;
    .header-right-title {
      font-size: 14px;
      color: #000;
      line-height: 21px;
      margin-bottom: 5px;
      word-break: break-word;
      max-height: 42px;
      overflow: hidden;
      position: relative;
    }
    .header-right-star {
      line-height: 11px;
      i {
        font-size: 13px;
        color: #ffb54d;
        margin-right: 7px;
      }
      .not-shiny {
        color: #999999;
      }
    }
    .header-right-content {
      display: flex;
      align-items: flex-end;
      .game-label {
        font-size: 9px;
        color: #999;
        border: 0.5px solid rgba(153, 153, 153, 0.5);
        border-radius: 6px;
        min-height: 13px;
        line-height: 13px;
        min-width: 43px;
        text-align: center;
        margin-right: 10px;
        padding: 1px 2px;
      }
      .game-popularity {
        font-size: 9px;
        color: #999;
        height: 15px;
        line-height: 15px;
        flex: 1;
      }
    }
  }
}
.game-detail-description {
  margin-top: 107px;
  margin-bottom: 15px;
  padding: 0 12px 0 12px;
  width: 100%;
  .description-title {
    font-size: 16px;
    color: #000000;
    line-height: 17px;
    padding: 15px 0 10px 0;
  }
  .description-content {
    // max-height: 45px;
    max-height: 40px;
    font-size: 9px;
    color: #000000;
    line-height: 13.5px;
    overflow: hidden;
    position: relative;
  }
  .description-trigger {
    height: 8px;
    font-size: 9px;
    line-height: 8px;
    color: #1787dd;
    text-align: right;
    margin-top: 8px;
    span {
      cursor: pointer;
    }
  }
}
.detail-list {
  width: 100%;
  margin-top: 15px;
  border-top: 0.5px solid #eee;
  .detail-placeholder {
    width: 100%;
    height: 40px;
    border-bottom: 0.5px solid #eee;
    //修改插件设置的padding
    .mint-navbar .mint-tab-item {
      padding: 0;
      padding-top: 16px;
    }
    //去掉插件自带的border
    .mint-navbar .mint-tab-item.is-selected {
      border: none;
    }
    .fiex-bar {
      flex: 1;
    }
  }
}
//修改插件的伪元素
.nav-item.is-selected::after {
  content: '';
  display: block;
  width: 13px;
  height: 2px;
  margin: auto;
  background: rgba(23, 135, 221, 1);
  margin-top: 10px;
}
.show-all-content {
  max-height: none !important;
}
.show-border-bottom {
  border-bottom: 0.5px solid #eeeeee;
}
</style>
