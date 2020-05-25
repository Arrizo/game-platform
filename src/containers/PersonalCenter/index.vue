<template>
  <div>
    <div class="personal">
      <div class="personal-header">
        <div class="header-background">
        </div>
        <div class="header-message">
          <div class="header-icon"></div>
          <header-icon :userIcon="userObj.iconUrl" :userIconSize="'personal-icon'" @showPreview="showPreview"></header-icon>
        </div>
        <p class="header-nickname">{{userObj.nickname}}</p>
        <div class="header-switch-account" @click="showLoginPopup">{{isLoginContent()}}</div>
        <p class="header-userid">
          <span>ID：</span>
          <span>{{userObj.userId}}</span>
        </p>
        <div class="header-menu clearfix">
          <a @click="bindAccount()">
            <i class="personal-account">
              <img :src="personIcon3" alt="">
            </i>
            <p>{{$t('message.me.bingAcct')}}</p>
          </a>
          <a @click="showtoast()">
            <i class="personal-gift">
              <img :src="personIcon1" alt="">
            </i>
            <p>{{$t('message.me.myPackage')}}</p>
          </a>
          <a @click="showMyInformation()">
            <i class="personal-info">
              <img :src="personIcon2" alt="">
            </i>
            <p :class="{newest:isShowRDPersonalMsg}">{{$t('message.me.myTicket')}}</p>
          </a>
          <a @click="showService()">
            <i class="personal-service">
              <img :src="personIcon4" alt="">
            </i>
            <p :class="{newest:isShowRDPersonalService}">{{$t('message.me.help')}}</p>
          </a>
        </div>
      </div>
      <div class="personal-played">
        <ghw-block-title :titleName="$t('message.me.playedApps')" :isShowMore="false" :customStyle="'personal-title'" v-if="playedArr.length!==0"></ghw-block-title>
        <ghw-rank-item :gameAppList="playedArr"></ghw-rank-item>
      </div>
      <ghw-no-content :isShowNoContent="!showloadingPage&&playedArr.length===0"></ghw-no-content>
      <ghw-load-gif :isShowLoadGif="showloadingPage"></ghw-load-gif>
      <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadPerNextPage" :isNoContent="!showloadingPage&&playedArr.length===0" />
    </div>
    <ghw-image-preview :isShowImage="isShowImage" :imgUrl="imgUrl" @restoreImage="isShowImage=false" :fullImagePreview="true" />
  </div>
</template>
<script>
import headSculptureImg from '@/assets/img/head-sculpture.png'
import GhwBlockTitle from '@/components/GhwBlockTitle'
import GhwIconMore from '@/components/GhwIconMore'
import { getPlayedList } from '@/services'
import heads from '@/assets/img/default_icon.png'
import heads2 from '@/assets/img/default_icon3.png'
import GhwReturnTop from '@/components/GhwReturnTop'
import { mapState } from 'vuex'
import Toast from '@/components/GhwToast/index.js'
import CookieUtil from '@/utils/CookieUtil'
import * as postMessageEvent from '@/config/postMessageEvent'
import gameStart from '@/utils/gameStart'
import GhwLoadGif from '@/components/GhwLoadGif'
import PersonalHeader from '@/containers/PersonalCenter/components/PersonalHeader'
import GhwBtn from '@/components/GhwBtn'
import GhwNoContent from '@/components/GhwNoContent'
import HeaderIcon from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderIcon'
import GhwRankItem from '@/components/GhwRankItem'
import GhwImagePreview from '@/components/GhwImagePreview'
import * as constVar from '@/config/const'
import personIcon4 from '@/assets/img/4person_icon.svg'
import personIcon3 from '@/assets/img/3person_icon.svg'
import personIcon2 from '@/assets/img/2person_icon.svg'
import personIcon1 from '@/assets/img/1person_icon.svg'

export default {
  name: 'PersonalCenter',
  extends: {},
  props: {},
  data () {
    return {
      heads,
      heads2,
      returnTop: false,
      isShowImage: false,
      othersBoxShow: true,
      imgUrl: '',
      page: 0,
      pageSize: 10,
      playedArr: [],
      // 用户的信息
      personCenter: {
        iconurl: '',
        nickName: ''
      },
      CookieUtil,
      userIdVal: '',
      showloadingPage: true,
      isNoMoredata: false,
      loadPerNextPage: false,
      headSculptureImg,
      personIcon1,
      personIcon2,
      personIcon3,
      personIcon4
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj,
      isShowRDPersonalMsg: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_MSG].hasRead,
      isShowRDPersonalService: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_SERVICE].hasRead
    })
  },
  components: {
    GhwIconMore,
    GhwReturnTop,
    PersonalHeader,
    GhwBtn,
    GhwBlockTitle,
    GhwLoadGif,
    GhwNoContent,
    HeaderIcon,
    GhwRankItem,
    GhwImagePreview
  },
  watch: {
    userIdVal: function (newvalue, oldvalue) {
      this.playedArr = []
      this.page = 0
      this.setPersonCenter()
      this.setPlayedArr()
    }
  },
  methods: {
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (!this.isNoMoredata && !this.showloadingPage) {
          this.loadPerNextPage = true
          this.setPlayedArr()
        }
      }
    },
    // 判断是否登录
    isLoginContent () {
      return this.isLogin ? this.$t('message.me.switchAccount') : this.$t('message.me.login')
    },
    // 跳转到我的客服
    showService () {
      if (this.isLogin) {
        // this.$store.dispatch('changeCookieState', { cookieName: 'redDotLocation_7', cookieFlag: false })
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_PERSONAL_SERVICE })
        this.$router.push({ name: 'ServiceMain' })
      } else {
        this.showLoginPopup()
      }
    },
    // 跳转到我的留言
    showMyInformation () {
      if (this.isLogin) {
        this.$router.push({ name: 'MyMessageList' })
        this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_PERSONAL_MSG })
      } else {
        this.showLoginPopup()
      }
    },
    // 跳转到个人资料页
    bindAccount () {
      this.isLogin ? this.$router.push({ name: 'BindAccount' }) : this.showLoginPopup()
    },
    showLoginPopup () {
      this.$loginBox().then().catch(err => console.log(err))
    },
    // 获取玩过的游戏
    setPlayedArr () {
      var obj = {}
      this.page++
      var userId = CookieUtil.getInstance().getSdkUserIdFromCookie()
      var userToken = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
      if (userId != null && userToken != null) {
        obj = {
          userId: userId,
          userToken: userToken,
          page: this.page,
          pageSize: this.pageSize
        }
      } else {
        this.showloadingPage = false
        this.isNoMoredata = true
        return false
      }
      getPlayedList(obj).then(res => {
        this.loadPerNextPage = false
        this.showloadingPage = false
        if (res.data) {
          // 没有数据时或没更多数据时隐藏load按钮
          if (res.data.appList.length === 0 || res.data.appList.length < this.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.appList.length > 0) {
            this.playedArr.push(...res.data.appList) // 结构并拼接到原数组中
          }
        }
      },
      error => {
        console.log(error)
        this.loadPerNextPage = false
        this.showloadingPage = false
      })
    },
    // 获取个人信息
    setPersonCenter () {
      this.userIdVal = CookieUtil.getInstance().getSdkUserIdFromCookie()
      let that = this // 闭包需要中转
      window.addEventListener('message', function (event) {
        if (!event || !event.data) {
          return
        }
        // 如果是字符串（必须是json形式），先转为json对象
        var eventObj = null
        if (Object.prototype.toString.call(event.data) === '[object String]') {
          eventObj = JSON.parse(event.data)
        } else if (Object.prototype.toString.call(event.data) === '[object Object]') {
          eventObj = event.data
        } else {
          eventObj = {}
        }
        // 处理不同消息来源
        // 1.处理token过期重新登录游戏
        if (eventObj && eventObj.cmd === postMessageEvent.CHANGE_LOGIN_STATUS &&
          eventObj.data.isLogin && eventObj.data.userId
        ) {
          that.userIdVal = eventObj.data.userId
        }
      }, false)
    },
    // 向刷新下加载数据
    loadBottom: function () {
      this.setPlayedArr()
    },
    // 时间转换格式方法
    getTime: function (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD')
    },
    ShowDe (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    },
    playGame (appId, url, name) {
      gameStart(this.isLogin, appId, name, url, this)
    },
    // 未开通功能提示
    showtoast () {
      Toast({
        message: (navigator.language || navigator.userLanguage).indexOf('zh') > -1 ? '功能未开通,敬请期待' : 'Coming soon...',
        iconClass: 'iconfont icon-toast-exclamationmark'
      })
    },
    showPreview (outline) {
      this.isShowImage = true
      this.imgUrl = outline
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    this.setPersonCenter()
    document.getElementById('innerWrapper').addEventListener('scroll', this.changeNavBoxStatue)
  },
  // 数据更新是调用
  beforeUpdate: function () {
  },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () {
    document.getElementById('innerWrapper').removeEventListener('scroll', this.changeNavBoxStatue)
  }
}
</script>

<style lang="scss" scoped>
.newest::before {
  top: -4px;
  right: 18px;
}
.personal {
  width: 100%;
  height: 100%;
  background: rgba(246, 246, 246, 1);
  .personal-header {
    height: 213px;
    background-color: #fff;
    margin-bottom: 8px;
    .header-background {
      background: url("../../assets/img/head-sculpture.png") no-repeat center;
      background-size: cover;
      height: 130px;
      width: 100%;
      img {
        height: 130px;
        max-width: none;
      }
    }
    .header-message {
      position: absolute;
      top: 21px;
      left: 50%;
      transform: translate(-50%);
      .header-icon {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.6;
      }
    }
    .header-nickname {
      position: absolute;
      top: 102px;
      left: 50%;
      transform: translate(-50%);
      height: 18px;
      line-height: 18px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      margin: 5px auto;
      text-align: center;
      width: 100%;
    }
    .header-switch-account {
      position: absolute;
      right: 0;
      width: 110px;
      height: 24px;
      line-height: 24px;
      background: rgba(73, 209, 244, 1);
      box-shadow: 0px 4px 9px 1px rgba(8, 71, 123, 0.35);
      top: 53px;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
    .header-userid {
      width: 100%;
      text-align: center;
      color: rgba(153, 153, 153, 1);
      font-size: 11px;
      margin-bottom: 16px;
      height: 9px;
      line-height: 11px;
    }
    .header-menu {
      a {
        float: left;
        width: 25%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &::before {
          content: "";
          display: block;
          width: 1px;
          height: 35px;
          background: rgba(238, 238, 238, 1);
          position: absolute;
          top: 8px;
          left: 0px;
        }
        &:first-child::before {
          width: 0;
        }
        i {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          img {
            width: 20px;
            height: 20px;
          }
        }

        p {
          width: 100%;
          text-align: center;
          margin-top: 6px;
          font-size: 9px;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .personal-service {
      background: linear-gradient(#5fe4fd, #4c87f7) center; /* 标准的语法 */
      &:active {
        background: #4c87f7;
      }
    }
    .personal-gift {
      background: linear-gradient(#c2c1c1, #999999) center;
    }
    .personal-info {
      background: linear-gradient(#ffd018, #ff9714) center;
      &:active {
        background: #ff9714;
      }
    }
    .personal-account {
      background: linear-gradient(#94bcff, #a871ff) center; /* 标准的语法 */
      &:active {
        background: #a871ff;
      }
    }
  }
  .personal-played {
    width: 100%;
    background-color: #fff;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .newest::before {
    right: 34px;
  }
}
</style>
