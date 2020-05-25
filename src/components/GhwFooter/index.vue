<template>
  <div class="footer" :class="{'footer-fixed': isShowPopup}">
    <!--最新消息用类名：newest;切换按钮样式用类名：cur;-->
    <router-link :to="{name:'Home'}" class="foot-home" :class="{cur:curIndex===1}">
      <span :class="{newest:isShowRDHome}">{{$t('message.public.pHomePage')}}</span>
    </router-link>
    <router-link :to="{name:'Game'}" class="foot-game" :class="{cur:curIndex===2}">
      <span :class="{newest:isShowRDGame}">{{$t('message.public.pMiniApp')}}</span>
    </router-link>
    <!--  classname newest is for new remind -->
    <router-link :to="{name:'PersonalCenter'}" class="foot-user" :class="{cur:curIndex===3}">
      <span :class="{newest:isShowRDFooter}">{{$t('message.public.pMe')}}</span>
    </router-link>
  </div>
</template>
<script>
/**
* 页脚栏
* @module @/components/GhwFooter
* @desc 底部导航栏
* @author yang huiru
* @date 2018.5.31
* @param {Number} [curIndex]    - 显示的tab序号1，2，3
* @example 调用示例
* <ghw-footer :curIndex="curIndex"></ghw-footer>
*/

import { mapState } from 'vuex'
import * as constVar from '@/config/const'

export default {
  name: 'Ghw-footer',
  extends: {},
  props: {
    curIndex: Number,
    isShowPopup: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      cur: ''
    }
  },
  computed: {
    ...mapState({
      isShowRDHomeBest: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_BEST].hasRead,
      isShowRDHomeNew: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_NEW].hasRead,
      isShowRDGameHot: state => state.redDotPush.redDotList[constVar.RED_DOT_GAME_HOT].hasRead,
      isShowRDGameNew: state => state.redDotPush.redDotList[constVar.RED_DOT_GAME_NEW].hasRead,
      isShowRDHomeInfoNews: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_NEWS].hasRead,
      isShowRDHomeInfoEvent: state => state.redDotPush.redDotList[constVar.RED_DOT_HOME_INFO_EVENT].hasRead,
      isShowRDPersonalInfo: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_MSG].hasRead,
      isShowRDPersonalService: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_SERVICE].hasRead
    }),
    isShowRDFooter: function () {
      return this.isShowRDPersonalInfo || this.isShowRDPersonalService
    },
    isShowRDGame: function () {
      return this.isShowRDGameNew || this.isShowRDGameHot
    },
    isShowRDHome: function () {
      return this.isShowRDHomeBest || this.isShowRDHomeNew || this.isShowRDHomeInfoNews || this.isShowRDHomeInfoEvent
    }
  },
  components: {

  },
  watch: {
  },
  methods: {
  },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.foot-home {
  position: relative;
  background: url("../../assets/img/home_icon.svg") center 7px no-repeat;
  background-size: 22px 23px;
}
.foot-home.cur {
  background: url("../../assets/img/home_icon2.svg") center 7px no-repeat;
  background-size: 22px 23px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #1787dd;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 50;
}
.footer a {
  float: left;
  width: 33.3%;
  height: 100%;
  font-size: 9px;
  color: rgba(147, 201, 243, 1);
  text-align: center;
  padding-top: 32px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.foot-game {
  position: relative;
  background: url("../../assets/img/game_icon.svg") center 9.5px no-repeat;
  background-size: 22px 23px;
}
.foot-game.cur {
  background: url("../../assets/img/game_icon2.svg") center 9.5px no-repeat;
  background-size: 22px 23px;
}
.foot-user {
  position: relative;
  background: url("../../assets/img/user_icon.svg") center 8px no-repeat;
  background-size: 20px 20px;
}
.foot-user.cur {
  background: url("../../assets/img/user_icon2.svg") center 8px no-repeat;
  background-size:20px 20px;
}
.footer a.cur {
  color: rgba(255, 255, 255, 1);
}
.footer a.newest:after {
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 8px;
}
.foot-fiex {
  position: relative;
}
.newest::before {
  right: 30px;
  top: 10px;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .newest::before {
    right: 34%;
    top: 10px;
  }
}
.footer-fixed{
  position: fixed;
}
</style>
