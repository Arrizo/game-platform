<template>
  <div class="warp">
    <div class="main white" id='main_white'>
      <!--新闻标题-->
      <!-- <div class="news-title">
        <h2>{{information.newsTitle}}</h2>
        <time>{{$t("message.public.info.issueDate")}} : {{publishTime}}</time>
      </div> -->
      <ghw-header-title :headerContent="getInfoTitle()" @goBack="goBack"></ghw-header-title>
      <!--新闻内容-->
      <div class="main-info" id="mainInfo">
        <ghw-info-detail :infoTitle="information.newsTitle" :infoPublishTime="information.publishTime" :infoDescription="information.newsContent" v-if="!isTimeout"></ghw-info-detail>
        <!-- <div class="news-box" id="news_box" v-html="information.newsContent" v-if="!isTimeout">
        </div> -->
        <div class="news-box timeout-news" v-if="isTimeout">
          <div>
            <img :src="noContentImg">
            <p class="timeoutmsg">{{$t("message.public.info.noContent")}}</p>
            <p class="timeoutmsg">
              <span>{{$t('message.public.info.autoReturn',{number:second})}}</span><br>
              <!-- <router-link :to="{name:'HomeTab', params:{tab:'navBar3',subNavBar: this.subNavBar}}" replace>{{$t("message.public.info.returnNow")}}</router-link> -->
              <ghw-btn :inputType="'button'" :size="'ellipse'" :type="'public'" :inputValue="$t('message.public.info.returnNow')" @triggerEvent="goBack()" class="ghw-btn" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--底部信息-->
    <div class="news-foot" :class="{'buttonShadow':isHasShadow}" v-if="!(information.appId===this.analyticsConst)">
      <ghw-btn :inputType="'button'" :size="'big-ellipse'" :type="'public'" :inputValue="$t('message.public.play')" @triggerEvent="playGame($event,information.appLink)" v-if="information.appStatus === 0" />
      <ghw-btn :inputType="'button'" :size="'big-ellipse'" :inputValue="$t('message.public.info.underMaint')"  :type="'underMaint'" v-else-if="information.appStatus ===1"/>
    </div>
    <div v-if="showLoadingDeatil" class="load-style load-img"><img :src=loadGif></div>
  </div>
</template>
<script>
import { getInformation } from '@/services'
import { mapState } from 'vuex'
import gameStart from '@/utils/gameStart'
// import GhwLoadGif from '@/components/GhwLoadGif'
import loadGif from '@/assets/img/loading-fish.svg'
import noContentImg from '@/assets/img/no-content.png'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import GhwBtn from '@/components/GhwBtn'
import GhwInfoDetail from '@/components/GhwInfoDetail'
import { NOT_GAME_APPID } from '@/config/analyticsConst'
export default {
  name: 'Information',
  extends: {},
  props: {},
  data () {
    return {
      // 父级传递的参数
      // tranInfo: {
      //   userId: this.$route.query.id,
      //   userAge: this.$route.query.age,
      //   usertoken: this.$route.query.token
      // },
      loadGif,
      publishTime: '',
      information: {},
      second: 3,
      clearIntervalId: null,
      subNavBar: this.$route.query.newType,
      notifType: this.$route.query.notifType,
      fromRouterName: this.$route.query.fromRouterName || 'Home',
      appId: this.$route.query.appId,
      isTimeout: false,
      showLoadingDeatil: true,
      noContentImg,
      isHasShadow: false,
      analyticsConst: NOT_GAME_APPID,
      interval: null,
      topValue: 0
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj
    })
  },
  components: {
    GhwHeaderTitle,
    GhwBtn,
    GhwInfoDetail
  },
  watch: {},
  methods: {
    // 返回主页info页面
    backToInfo () {
      this.$router.go(-1)
    },
    goBack () {
      clearInterval(this.clearIntervalId)
      if (this.appId) {
        this.$router.push({ name: this.fromRouterName, params: { tab: 'navBar3', subNavBar: this.subNavBar }, query: { appId: this.appId } })
      } else {
        this.$router.push({ name: this.fromRouterName, params: { tab: 'navBar3', subNavBar: this.subNavBar } })
      }
    },
    // 开始游戏
    playGame (event, url) {
      gameStart(this.isLogin, this.information.appId, this.information.appName, url, this)
    },
    // 获取资讯详细信息
    setInformation () {
      const obj = {
        newsId: this.$route.query.newsId
      }
      getInformation(obj).then(res => {
        if (!res.data) {
          this.isTimeout = true
          this.clearIntervalId = setInterval(this.recondTime, 1000)
          this.showLoadingDeatil = false
          return
        }
        if (res.data.newsContent) {
          this.information = res.data
          this.publishTime = this.getTime(res.data.publishTime)
        }
        this.showLoadingDeatil = false
      }, error => {
        console.log(error)
        this.showLoadingDeatil = false
      })
    },
    // gameLink (link) {
    //   window.location.href = link
    //   console.log(link)
    // },
    // 时间格式转换方法
    getTime (time) {
      var Time = new Date(parseInt(time))
      return this.$moment(Time).format('YYYY-MM-DD')
    },
    // 发布资讯不存在3s自动返回
    recondTime () {
      this.second--
      if (this.second <= 0) {
        this.second = 3
        this.goBack()
      }
    },
    ScrollEvent () {
      this.isHasShadow = true
      this.topValue = document.getElementById('main_white').scrollTop
      if (this.interval === null) {
        this.interval = setInterval(() => {
          if (document.getElementById('main_white').scrollTop === this.topValue) {
            clearInterval(this.interval)
            this.interval = null
            this.isHasShadow = false
            document.getElementById('main_white').removeEventListener('scroll', this.ScrollEvent, false)
          }
        }, 100)
      }
    },
    initScroll () {
      document.getElementById('main_white').addEventListener('scroll', this.ScrollEvent, false)
    },
    getInfoTitle () {
      if (this.subNavBar === undefined) {
        return this.notifType === 1 ? this.$t('message.homepage.announcement') : this.$t('message.homepage.event')
      } else {
        return this.subNavBar === 'subNavBar1' ? this.$t('message.homepage.announcement') : this.$t('message.homepage.event')
      }
    }
    // infoReturn () {
    //   clearInterval(this.clearIntervalId)
    //   this.$router.push({ name: this.fromRouterName, params: { tab: 'navBar3', subNavBar: this.subNavBar } })
    // }
  },
  beforeMount () { },
  mounted: function () {
    this.setInformation()
    this.initScroll()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () {
    clearInterval(this.clearIntervalId)
  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
}
.main {
  position: absolute;
  top: 0;
  bottom: 50px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.white {
  word-wrap: break-word;
  text-align: justify;
  background-color: #f6f6f6;
}
.news-title {
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  background: #fff;
  /* border-bottom: 7px solid #F6F6F6; */
  margin-bottom: 7px;
}
.news-title h2 {
  color: #444444;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
}
.news-title time {
  font-size: 9px;
  color: #8f9090;
}
.main-info {
  min-height: 90%;
  background: #fff;
  margin-top: 51px;
}
.news-box {
  width: 90%;
  min-height: 100px;
  padding: 15px 0 30px;
  margin: 0 auto;
  background: #fff;
}
.news-box p {
  color: #444444;
  line-height: 20px;
  font-size: 12px;
}
/*.news_img{width: 90%; margin: 15px auto;overflow: hidden;}*/
.news-foot {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #fff;
}
// .news-return-list,
// .news-play,
.buttonShadow {
  box-shadow: 1px -1px 5px 1px rgba(3, 3, 3, 0.05);
}
.ghw-btn {
  margin-top: 25px;
  position: relative !important;
}
.timeout-news div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  img {
    margin-bottom: 15px;
  }
}
.timeout-news p {
  text-align: center;
  color: rgba(153, 153, 153, 1);
  font-size: 13px;
}
.timeout-news p a {
  text-decoration: underline;
  color: blue;
}
.load-img {
  padding-top: 130px;
}
.load-img img {
  z-index: 2;
  padding-top: -50px;
}
.timeout-news {
  width: 100%;
}
</style>
