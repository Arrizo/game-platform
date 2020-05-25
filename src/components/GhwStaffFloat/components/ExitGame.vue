<template>
  <ghw-pop-up :isShowPopUp="isExitGame" @closePopUp="$emit('closeLeaveGame')" @closeMask="$emit('closeLeaveGame')">
    <div slot="title">
      {{$t('message.buoy.exitGameData.hotGame')}}
    </div>
    <div slot="content" class="hot-game-content">
      <div v-for="(item,index) in hotItemsArr" :key="'hotItem'+index" class="hot-game-item" @click="playOtherGame(item.appId,item.appName)">
        <ghw-game-icon :appIconUrl="item.appIconUrl" :appIconSize="'large'"></ghw-game-icon>
        <p>{{item.appName}}</p>
      </div>
    </div>
    <div slot="btn">
      <ghw-btn :type="'popup'" :inputValue="$t('message.buoy.exitGameData.leave')" :size="'public'" :inputType="'button'" @triggerEvent="leaveGame"></ghw-btn>
    </div>
    <div slot="tipMessage" class="not-show-today">
      <input type="checkbox" checked="checked" id="showagain" v-model="isNotShowAgain">
      <label for="showagain" class="not-show-again">{{$t('message.buoy.exitGameData.dontShow')}}</label>
    </div>
  </ghw-pop-up>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwStaffFloat/components/ExitGame.vue
* @desc 隐私政策
* @author yang huiru
* @date 2018.7.16
* @example 调用示例
* <exit-game></exit-game>
*/
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
import setMillisecondCookie from '@/utils/setMillisecondCookie'
import { getAppList } from '@/services'
import gameStart from '@/utils/gameStart'
import GhwGameIcon from '@/components/GhwGameIcon'
// import StoreUtil from '@/utils/StoreUtil'
import { mapState } from 'vuex'
import platform from 'platform'
export default {
  name: 'PrivacyPolicy',
  extends: {},
  props: {
  },
  data () {
    return {
      hotItemsArr: [{ appIconUrl: '' }],
      isNotShowAgain: false
    }
  },
  computed: {
    ...mapState({
      appId: state => state.user.appId,
      isLogin: state => state.user.isLogin,
      isExitGame: state => state.user.isExitGame,
      isFromQR: state => state.user.isFromQR,
      leaveGameRouter: state => state.user.leaveGameRouter,
      isPcPostEvent: state => state.user.isPcPostEvent
    })
  },
  components: {
    GhwPopUp,
    GhwBtn,
    GhwGameIcon
  },
  watch: {
  },
  methods: {
    // 确认离开游戏leave
    leaveGame () {
      if (this.isNotShowAgain) {
        var curDate = new Date()
        // 当前时间戳
        var curTamp = curDate.getTime()
        // 零点时间戳
        var curWeeHours = 0
        // 当前日期
        var curDay = curDate.toLocaleDateString()
        curWeeHours = new Date(curDay).getTime() - 1
        // 当日已经过去的时间（毫秒）
        var passedTamp = curTamp - curWeeHours
        // 当日剩余时间
        var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
        // var leftTime = new Date()
        setMillisecondCookie('showExiGame', true, leftTamp)
      }
      this.$store.dispatch('isShowPopup', { isShowPopup: false })
      this.$store.dispatch('setExitGameStatus', { isExitGame: false })
      this.$store.dispatch('setLeaveGameStatus', { isLeaveGame: true })
      if (this.isPcPostEvent) {
        var route = this.leaveGameRouter
        this.$router.push({ name: route.name, query: route.query, params: route.params })
        this.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: false })
      } else {
        if (platform.os.family === 'iOS' && ~platform.name.indexOf('Chrome')) {
          // 由于IOS的chrome浏览器next(false)时会消耗路由栈，所以定向push
          const route = this.leaveGameRouter
          if (route.name === 'Login') {
            this.$router.replace({ name: 'Home' })
          } else {
            this.$router.replace({ name: route.name, query: route.query, params: route.params })
          }
        } else {
          this.$router.back()
        }
      }
    },
    // 获取浮标离开游戏的推荐游戏
    getHotGameItem () {
      var obj = {
        locationType: 12
      }
      getAppList(obj).then(res => {
        if (res.data.appList.length !== 0) {
          var arr = res.data.appList
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].appId === this.appId) {
              arr.splice(i, 1)
            }
          }
          if (arr.length > 4) {
            arr.splice(4, arr.length - 4)
          }
          this.hotItemsArr = arr
        }
      })
    },
    // 开始玩其他游戏
    playOtherGame (appId, appName) {
      var isPlayOtherGame = true
      gameStart(this.isLogin, appId, appName, '', this, '', isPlayOtherGame)
      // setTimeout(() => {
      //   // 重新刷新页面
      //   window.location.reload()
      // }, 1000)
      this.$emit('closeLeaveGame')
    }
  },
  beforeMount () { },
  mounted () {
    this.getHotGameItem()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.hot-game-content {
  padding: 0 13px;
}
.hot-game-item {
  width: 49.5px;
  display: inline-block;
  margin-right: 18px;
  &:last-child {
    margin-right: 0;
  }
  p {
    width: 100%;
    font-size: 9px;
    color: rgba(76, 76, 76, 1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
}
input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

.not-show-today {
  text-align: right;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  label {
    height: 15px;
    line-height: 15px;
  }
}
input[type="checkbox"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  width: 8px;
  height: 8px;
  margin-right: 5px;
  border: 1px solid rgba(153, 153, 153, 1);
  /* border-radius: 50%; */
  // text-indent: 1px;
  line-height: 8px; /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
  margin-top: -2px;
}
input[type="checkbox"]:checked + label::before {
  content: "\2713";
  font-size: 10px;
  color: rgba(23, 135, 221, 1);
  /* background-color: yellowgreen; */
}
.wrap-box-btn{
  & /deep/ .button-popup{
    float: none;
  }
}
</style>
