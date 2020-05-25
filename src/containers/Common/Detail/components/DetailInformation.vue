<template>
  <div>
    <div class="sub-info-placeholder" ref="infoList">
      <mt-navbar v-model="subNavBar" class="sub-info-box">
        <template v-if="anncShow">
          <mt-tab-item id="subNavBar1" class="sub-nav-item">{{$t("message.homepage.announcement")}}</mt-tab-item>
        </template>
        <template v-if="guideShow">
          <mt-tab-item id="subNavBar2" class="sub-nav-item">{{$t("message.homepage.strategy")}}</mt-tab-item>
        </template>
        <template v-if="eventShow">
          <mt-tab-item id="subNavBar3" class="sub-nav-item">{{$t("message.homepage.event")}}</mt-tab-item>
        </template>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="subNavBar">
      <template v-if="anncShow">
        <mt-tab-container-item id="subNavBar1">
          <!--公告-->
          <!-- <div class="newsList"> -->
          <ghw-consulting-item :newsArr="newsArr"></ghw-consulting-item>
          <!-- 页面暂无数据 -->
          <ghw-no-content :isShowNoContent="!showAnncLoading&&newsArr.length===0"></ghw-no-content>
          <!--更多-->
          <ghw-load-gif :isShowLoadGif="showAnncLoading"></ghw-load-gif>
          <ghw-icon-more :isNoMoredata="newsArrIconMore" :loadNextPage="loadAnncNextPage" :isNoContent="!showAnncLoading&&newsArr.length===0" />
          <!-- </div> -->
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
          <ghw-icon-more v-if="gameGuideArrIconMore" @clickHandeler="getMoreGuide" :isNoContent="!showEventLoading&&gameGuideArr.length===0" />
        </mt-tab-container-item>
      </template>
      <template v-if="eventShow">
        <mt-tab-container-item id="subNavBar3">
          <!--活动-->
          <ghw-info-event :eventArr="eventArr"></ghw-info-event>
          <!-- <ghw-consulting-item :newsArr="eventArr"></ghw-consulting-item> -->
          <!-- 页面暂无数据 -->
          <ghw-no-content :isShowNoContent="!showEventLoading&&eventArr.length===0"></ghw-no-content>
          <!--更多-->
          <ghw-load-gif :isShowLoadGif="showEventLoading"></ghw-load-gif>
          <ghw-icon-more :isNoMoredata="eventArrIconMore" :loadNextPage="loadEventNextPage" :isNoContent="!showEventLoading&&eventArr.length===0" />
        </mt-tab-container-item>
      </template>
    </mt-tab-container>
  </div>
</template>
<script>
import GhwIconMore from '@/components/GhwIconMore'
import { getNewsList } from '@/services'
import { mapState } from 'vuex'
import GhwLoadGif from '@/components/GhwLoadGif'
import GhwConsultingItem from '@/components/GhwConsultingItem'
import GhwInfoEvent from '@/components/GhwInfoEvent'
import GhwNoContent from '@/components/GhwNoContent'
import PrivacyPolicy from '@/components/GhwPopUp/components/PrivacyPolicy.vue'
import { API_PATH } from '@/config/env'
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
      redDotArrList: state => state.redDotPush.redDotArrList
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
    subNavBar (newVal, oldVal) {
      // 切换导航栏请求接口
      this.focusTab()
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
    loadMoreDetailList () {
      let ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        // 获取更多事件(大鲸鱼图出现并且无更多数据时都不执行)
        if (this.subNavBar === 'subNavBar1' && !this.showAnncLoading && !this.newsArrIconMore) {
          this.anncPage++
          this.loadAnncNextPage = true
          this.setNewsList()
        }
        // 获取更多资讯
        if (this.subNavBar === 'subNavBar3' && !this.showEventLoading && !this.eventArrIconMore) {
          this.eventPage++
          this.loadEventNextPage = true
          this.setEventList()
        }
      }
    },
    // 加载资讯接口
    setNewsList () {
      const obj = {
        newsType: 0,
        page: this.anncPage,
        pageSize: 10,
        appId: this.$route.query.appId
      }
      getNewsList(obj).then(res => {
        this.showAnncLoading = false
        this.loadAnncNextPage = false
        if (res.data.newsList.length > 0) {
          this.newsArr.push(...res.data.newsList)
        }
        if (res.data.newsList.length < obj.pageSize) {
          this.newsArrIconMore = true
        }
      })
    },
    // 加载攻略接口
    setGameGuideList () {
      const obj = {
        newsType: 1,
        page: this.guidePage,
        pageSize: 10,
        appId: this.$route.query.appId
      }
      getNewsList(obj).then(res => {
        if (res.data.newsList.length > 0) {
          this.gameGuideArr.push(...res.data.newsList)
        }
        if (res.data.newsList.length < obj.pageSize) {
          this.gameGuideArrIconMore = true
        }
      })
    },
    // 加载事件接口
    setEventList () {
      const obj = {
        newsType: 2,
        page: this.eventPage,
        pageSize: 10,
        appId: this.$route.query.appId
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
    // 加载聚焦的页面接口
    this.focusTab()
    document.getElementById('innerWrapper').addEventListener('scroll', this.loadMoreDetailList)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () {
    document.getElementById('innerWrapper').removeEventListener('scroll', this.loadMoreDetailList)
  }
}
</script>
<style lang="scss" scoped>
/*二级导航栏*/
.sub-info-placeholder {
  width: calc(100% - 24px);
  height: 35px;
  margin: auto;
  & /deep/ .is-fixed {
    top: 40px;
  }
}
.sub-info-box {
  width: 100%;
  height: 35px;
  border-bottom: 0.5px solid rgba(238, 238, 238, 1);
  margin-top: 0.5px;
  & /deep/ .sub-nav-item {
    height: 35px;
    text-align: center;
    line-height: 35px;
    position: relative;
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
    border-bottom: none;
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
// .newest::before {
//   right: 35%;
// }
// .newsList {
//   position: relative;
//   width: 100%;
// }
// .mint-navbar.is-fixed {
//   box-shadow: 0 2px 5px #ebebeb;
// }
// @media only screen and (min-width: 768px) and (max-width: 1024px) {
//   .newest::before {
//     // right: 154px;
//   }
// }
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
