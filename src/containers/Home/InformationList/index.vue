<template>
  <div>
    <div class="sub-nav-box-placeholder" ref="infoList">
      <mt-navbar v-model="subNavBar" :fixed="isSubNavBarFixed" class="sub-nav-box">
        <template v-if="anncShow">
          <div class="fiex-bar">
            <mt-tab-item id="subNavBar1" class="sub-nav-item sub-left" :class="{newest:isShowRDHomeInfoNews}">{{$t("message.homepage.announcement")}}</mt-tab-item>
          </div>
        </template>
        <template v-if="guideShow">
          <mt-tab-item id="subNavBar2" class="sub-nav-item ">{{$t("message.homepage.strategy")}}</mt-tab-item>
        </template>
        <template v-if="eventShow">
          <mt-tab-item id="subNavBar3" class="sub-nav-item sub-right" :class="{newest:isShowRDHomeInfoEvent}">{{$t("message.homepage.event")}}</mt-tab-item>
        </template>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="subNavBar" class="newsBox">
      <template v-if="anncShow">
        <mt-tab-container-item id="subNavBar1">
          <!--公告-->
          <div class="newsList">
            <ghw-consulting-item :newsArr="newsArr" :subNavBar="subNavBar"></ghw-consulting-item>
            <!-- 页面暂无数据 -->
            <ghw-no-content :isShowNoContent="!showAnncLoading&&newsArr.length===0"></ghw-no-content>
            <!--更多-->
            <ghw-load-gif :isShowLoadGif="showAnncLoading"></ghw-load-gif>
            <ghw-icon-more :isNoMoredata="newsArrIconMore" :loadNextPage="loadAnncNextPage" :isShowBottomText="false" :isNoContent="!showAnncLoading&&newsArr.length===0" />
            <!-- 隐私政策 -->
            <div class="privacy" v-if="!showAnncLoading">
              <a href="#" class="privacy" @click="isShowPolicy=true">{{$t('message.buoy.privacy.privacyControl')}}</a>
            </div>
          </div>
        </mt-tab-container-item>
      </template>
      <template v-if="guideShow">
        <mt-tab-container-item id="subNavBar2">
          <!--攻略-->
          <ghw-consulting-item :newsArr="gameGuideArr" :subNavBar="subNavBar"></ghw-consulting-item>
          <!-- 页面暂无数据 -->
          <ghw-no-content :isShowNoContent="gameGuideArr.length===0"></ghw-no-content>
          <!--更多-->
          <ghw-load-gif :isShowLoadGif="showEventLoading"></ghw-load-gif>
          <ghw-icon-more v-if="gameGuideArrIconMore" @clickHandeler="getMoreGuide" :isShowBottomText="false" :isNoContent="!showEventLoading&&gameGuideArr.length===0" />
        </mt-tab-container-item>
      </template>
      <template v-if="eventShow">
        <mt-tab-container-item id="subNavBar3">
          <!--活动-->
          <!-- <ghw-consulting-item :newsArr="eventArr"></ghw-consulting-item> -->
          <ghw-info-event :eventArr="eventArr"></ghw-info-event>
          <!-- 页面暂无数据 -->
          <ghw-no-content :isShowNoContent="!showEventLoading&&eventArr.length===0"></ghw-no-content>
          <!--更多-->
          <ghw-load-gif :isShowLoadGif="showEventLoading"></ghw-load-gif>
          <ghw-icon-more :isNoMoredata="eventArrIconMore" :loadNextPage="loadEventNextPage" :isShowBottomText="false" :isNoContent="!showEventLoading&&eventArr.length===0" />
          <!-- 隐私政策 -->
          <div class="privacy" v-if="!showEventLoading">
            <a href="#" class="privacy" @click="isShowPolicy=true">{{$t('message.buoy.privacy.privacyControl')}}</a>
          </div>
        </mt-tab-container-item>
      </template>
    </mt-tab-container>
    <privacy-policy :isShowPolicy="isShowPolicy" @closePolicy="isShowPolicy=false" :privacyUrl="'https://www.chipsgames.com/privacy/privacy_and_cookie_policy.html'"></privacy-policy>
  </div>
</template>
<script>
import GhwIconMore from '@/components/GhwIconMore'
import { getNewsList } from '@/services'
import { mapState } from 'vuex'
import GhwLoadGif from '@/components/GhwLoadGif'
import GhwConsultingItem from '@/components/GhwConsultingItem'
import GhwNoContent from '@/components/GhwNoContent'
import PrivacyPolicy from '@/components/GhwPopUp/components/PrivacyPolicy.vue'
import GhwInfoEvent from '@/components/GhwInfoEvent'
import { API_PATH } from '@/config/env'
import * as constVar from '@/config/const'

export default {
  name: 'InformationList',
  extends: {},
  props: {
    isSubNavBarFixed: {
      type: Boolean,
      default () {
        return false
      }
    },
    subNavBar3: {
      type: String,
      default: 'subNavBar3'
    },
    isLoadNextPage: {
      type: Boolean,
      default () {
        return false
      }
    },
    gameListOffsetTop: {
      type: Number,
      default () {
        return 0
      }
    },
    isStartService: {
      type: Boolean,
      default: false
    },
    navBar: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      subNavBar: this.$route.params.subNavBar ? this.$route.params.subNavBar : 'subNavBar1',
      newsArr: [],
      gameGuideArr: [],
      eventArr: [],
      anncPage: 1,
      guidePage: 1,
      eventPage: 1,
      anncShow: true,
      guideShow: false,
      eventShow: true,
      // 是否加载下一页
      loadEventNextPage: false,
      loadAnncNextPage: false,
      // 是否显示暂时无更多数据
      newsArrIconMore: false,
      gameGuideArrIconMore: true,
      eventArrIconMore: false,
      // 是否显示鲸鱼
      showEventLoading: true,
      showAnncLoading: true,
      // 判断tab是否是第一次加载
      flagSubNavBar1: 0,
      flagSubNavBar2: 0,
      flagSubNavBar3: 0,
      scrollTopSubNavBar1: 0,
      scrollTopSubNavBar2: 0,
      scrollTopSubNavBar3: 0,
      isShowPolicy: false,
      API_PATH
    }
  },
  computed: {
    ...mapState({
      count: state => state.user.count,
      redDotList: state => state.redDotPush.redDotList,
      isShowRDHomeInfoNews: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_NEWS].hasRead,
      isShowRDHomeInfoEvent: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_EVENT].hasRead
    })
  },
  components: {
    GhwLoadGif,
    GhwIconMore,
    GhwConsultingItem,
    GhwNoContent,
    PrivacyPolicy,
    GhwInfoEvent
  },
  watch: {
    isLoadNextPage (val) {
      if (val) {
        if (this.subNavBar === 'subNavBar1' && !this.newsArrIconMore && !this.showAnncLoading) {
          this.loadAnncNextPage = true
          this.getMoreAnnc()
        }
        if (this.subNavBar === 'subNavBar3' && !this.eventArrIconMore && !this.showEventLoading) {
          this.loadEventNextPage = true
          this.getMoreEvent()
        }
      }
    },
    subNavBar (newVal, oldVal) {
      const self = this
      this.focusTab()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (newVal === oldVal) return
      if (self.isSubNavBarFixed) {
        switch (oldVal) {
          case 'subNavBar1':
            self.scrollTopSubNavBar1 = scrollTop
            break
          case 'subNavBar2':
            self.scrollTopSubNavBar2 = scrollTop
            break
          case 'subNavBar3':
            self.scrollTopSubNavBar3 = scrollTop
            break
        }
        switch (newVal) {
          case 'subNavBar1':
            setTimeout(
              function () {
                try {
                  window.offsetTop = self.scrollTopSubNavBar1
                } catch (error) {
                  document.documentElement.scrollTop = document.body.scrollTop = self.scrollTopSubNavBar1
                }
              }, 10
            )
            break
          case 'subNavBar2':
            setTimeout(
              function () {
                try {
                  window.offsetTop = self.scrollTopSubNavBar2
                } catch (error) {
                  document.documentElement.scrollTop = document.body.scrollTop = self.scrollTopSubNavBar2
                }
              }, 10
            )
            break
          case 'subNavBar3':
            setTimeout(
              function () {
                try {
                  window.offsetTop = self.scrollTopSubNavBar3
                } catch (error) {
                  document.documentElement.scrollTop = document.body.scrollTop = self.scrollTopSubNavBar3
                }
              }, 10
            )
            break
        }
      }
      if (newVal === 'subNavBar1') {
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_INFO_NEWS })
      } else if (newVal === 'subNavBar3') {
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_INFO_EVENT })
      }
    },
    gameListOffsetTop (newVal) {
      if (this.scrollTopSubNavBar1 === 0) {
        this.scrollTopSubNavBar1 = newVal
      }

      if (this.scrollTopSubNavBar2 === 0) {
        this.scrollTopSubNavBar2 = newVal
      }

      if (this.scrollTopSubNavBar3 === 0) {
        this.scrollTopSubNavBar3 = newVal
      }
    },
    isStartService (newVal) {
      if (newVal) {
        this.focusTab()
      }
    },
    redDotList () {
      // 初次登录不调用接口，点击之后且有红点再数据在重新渲染
      if (this.newsArr.length > 0 || this.eventArr.length > 0) {
        if (this.redDotArrList.isRedDotHomeInfoNews) {
          this.newsArr = []; this.anncPage = 1; this.setNewsList()
        }
        if (this.redDotArrList.isRedDotHomeInfoEvent) {
          this.eventArr = []; this.eventPage = 1; this.setEventList()
        }
      }
    },
    navBar () {
      if (this.navBar === 'navBar3' && this.subNavBar === 'subNavBar1') {
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_HOME_INFO_NEWS })
      }
    }
  },
  methods: {
    // 判断加载哪个tab的接口
    focusTab () {
      switch (this.subNavBar) {
        case 'subNavBar1':
          if (this.flagSubNavBar1 === 0) {
            this.setNewsList()
            this.flagSubNavBar1++
          }
          break
        case 'subNavBar2':
          if (this.flagSubNavBar2 === 0) {
            this.setGameGuideList()
            this.flagSubNavBar2++
          }
          break
        case 'subNavBar3':
          if (this.flagSubNavBar3 === 0) {
            this.setEventList()
            this.flagSubNavBar3++
          }
          break
      }
    },
    // 获取更多事件
    getMoreEvent () {
      this.eventPage++
      this.setEventList()
    },
    // 获取更多攻略
    getMoreGuide () {
      this.guidePage++
      this.setGameGuideList()
    },
    // 获取更多资讯
    getMoreAnnc () {
      this.anncPage++
      this.setNewsList()
    },
    // 加载资讯接口
    setNewsList () {
      const obj = {
        newsType: 0,
        page: this.anncPage,
        pageSize: 13
      }
      getNewsList(obj).then(res => {
        this.showAnncLoading = false
        this.loadAnncNextPage = false
        this.$emit('isShowLoadGifNews', false)
        if (res.data.newsList && res.data.newsList.length > 0) {
          this.newsArr.push(...res.data.newsList)
        } else {
          this.newsArrIconMore = true
        }
      })
    },
    // 加载攻略接口
    setGameGuideList () {
      const obj = {
        newsType: 1,
        page: this.guidePage,
        pageSize: 13
      }
      getNewsList(obj).then(res => {
        if (res.data.newsList && res.data.newsList.length > 0) {
          this.gameGuideArr.push(...res.data.newsList)
        } else {
          this.gameGuideArrIconMore = false
        }
      })
    },
    // 加载事件接口
    setEventList () {
      const obj = {
        newsType: 2,
        page: this.eventPage,
        pageSize: 13
      }
      getNewsList(obj).then(res => {
        this.loadEventNextPage = false
        this.showEventLoading = false
        this.$emit('isShowLoadGifEvent', false)
        if (res.data.newsList && res.data.newsList.length > 0) {
          this.eventArr.push(...res.data.newsList)
        } else {
          this.eventArrIconMore = true
        }
      })
    }
  },
  beforeMount () { },
  mounted () {
    this.scrollTopSubNavBar1 = this.gameListOffsetTop
    this.scrollTopSubNavBar2 = this.gameListOffsetTop
    this.scrollTopSubNavBar3 = this.gameListOffsetTop
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
/*二级导航栏*/
.sub-nav-box-placeholder {
  width: 100%;
  height: 35px;
  & /deep/ .is-fixed {
    top: 40px;
  }
}
.sub-nav-box {
  width: 100%;
  height: 35px;
  & /deep/ .sub-left {
    margin-left: 12px;
  }
  & /deep/ .sub-right {
    margin-right: 12px;
  }
  & /deep/ .sub-nav-item {
    height: 35px;
    text-align: center;
    line-height: 35px;
    position: relative;
    border-bottom: 1px solid #eee;
    &:after {
      content: '';
      display: inline-block;
      height: 15px;
      width: 1px;
      position: absolute;
      right: 0;
      background: rgba(238, 238, 238, 1);
      top: 11px;
    }
    &:last-child:after {
      height: 0;
    }
    .mint-tab-item-label {
      margin-top: -6.5px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
    }
  }
  & /deep/ .sub-nav-item.is-selected {
    background: none;
    border-bottom: 1px solid #eee;
    .mint-tab-item-label {
      width: 55px;
      height: 24px;
      line-height: 24px;
      border: 1px solid rgba(23, 135, 221, 0.5);
      border-radius: 12px;
      font-size: 14px;
      color: rgba(23, 135, 221, 1);
      margin: auto;
      margin-top: -12px;
    }
  }
}
.fiex-bar::after {
  content: '';
  position: absolute;
  right: 0px;
  top: 10px;
  height: 15px;
  width: 1px;
  z-index: 1;
  background: #eee;
}
.newest::before {
  right: 35%;
}
.newsBox {
  position: relative;
  width: 100%;
  min-height: 100px;
  // background: #F6F6F6;
}
.newsList {
  position: relative;
  width: 100%;
}
.mint-navbar.is-fixed {
  box-shadow: 0 2px 5px #ebebeb;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .newest::before {
    // right: 154px;
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
