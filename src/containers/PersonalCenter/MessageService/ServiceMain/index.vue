<template>
  <div>
    <ghw-header-title :headerContent="$t('message.me.help')" @goBack="goBack" :iconStyle="'remind'" @hanlderMessage="showServieceTips" v-if="!isService&&serviceTitle" :isShowWarn="true" :warnContent="warnContent" :isChangeContent='isChangeContent' :isHasRedDot='isHasRedDot'></ghw-header-title>
    <!--留言板-->
    <div class="list">
      <div class="service-book-box clearfix" id="service-book-box" :class="{'service-top': isService,'game-service-top':isPlaying}">
        <mt-navbar v-model="selected" :fixed="isNavBarFixed">
          <mt-tab-item id="selecte1">
            <a class="service-add">
              <span>{{$t('message.me.ticket.checkTicket')}}</span>
            </a>
          </mt-tab-item>
          <!-- 查看留言 -->
          <mt-tab-item id="selecte2">
            <a class="service-look selecte2">
              <span>{{$t('message.me.ticket.openNewTicket')}}</span>
            </a>
          </mt-tab-item>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="selected" :class="{'service-content-top':isPlaying}">
        <mt-tab-container-item id="selecte1">
          <service-view :isDataRefresh="isDataRefresh"></service-view>
        </mt-tab-container-item>
        <mt-tab-container-item id="selecte2">
          <service-add @jumpMessage="handlerMessage" @warnHandler="warnHandler" :isShowAppName='!serviceTitle'></service-add>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ghw-pop-up :isShowPopUp="isShowTips" :isShowClose="true" @closePopUp="showServieceTips">
      <div slot="title">
        {{$t('message.public.notes')}}
      </div>
      <div slot="content" class="reminder-content">
        <div v-html="$t('message.me.ticket.ticketNote')"></div>
      </div>
    </ghw-pop-up>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ServiceView from '../ServiceView'
import ServiceAdd from '../ServiceAdd'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import getCookie from '@/utils/getCookie'
import setCookie from '@/utils/setCookie'
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
import * as BrowserUtils from '@/utils/BrowserUtils'
export default {
  name: 'ServiceMain',
  extends: {},
  props: {
    serviceTitle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selected: this.$route.params.selected || 'selecte1',
      isDataRefresh: false,
      isShowTips: false,
      isHasRedDot: true,
      isNavBarFixed: false,
      warnContent: '',
      isChangeContent: false
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj,
      isService: state => state.user.isService,
      isPlaying: state => state.user.isPlaying
    })
  },
  components: {
    GhwHeaderTitle,
    ServiceView,
    ServiceAdd,
    GhwPopUp,
    GhwBtn
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'PersonalCenter' })
      // this.$router.back()
    },
    handlerMessage (value) {
      this.selected = value
      this.isDataRefresh = !this.isDataRefresh
    },
    showServieceTips () {
      this.isShowTips = !this.isShowTips
      // let redDotCookie = getCookie('redDotCookie')
      this.isHasRedDot = false
      setCookie('supportNoticeHasRedDot', 0)
    },
    isHasTipsCookie () {
      if (!this.isPlaying) {
        let cookie = getCookie('tipsCookie')
        if (cookie) {
          this.isShowTips = false
        } else {
          setCookie('tipsCookie', true, 6)
          this.isShowTips = true
        }
      }
    },
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (scrollTop === 0) {
        this.isNavBarFixed = false
      } else {
        this.isNavBarFixed = true
      }
    },
    // 判断是否是从游戏浮标进入的客服
    isFloatService () {
      var url = location.href // 获取url中"?"符后的字串
      const urlParams = BrowserUtils.getUrlParams(url)
      if (urlParams.isService === '1') {
        this.$store.dispatch('isFloatService', { isService: true })
      } else {
        this.isHasTipsCookie()
      }
    },
    warnHandler (content) {
      this.warnContent = content
      this.isChangeContent = !this.isChangeContent
      this.$emit('serviceWarnContent', content, this.isChangeContent)
    },
    // 检查cookie中的notice是否已点
    setHasRedDot () {
      if (getCookie('supportNoticeHasRedDot') === undefined) {
        setCookie('supportNoticeHasRedDot', 1)
      }
      this.isHasRedDot = !!parseInt(getCookie('supportNoticeHasRedDot'))
    }
  },
  // 挂载之前调用
  beforeMount: function () {
    this.setHasRedDot()
  },
  // 挂载到实例上调用
  mounted: function () {
    this.isFloatService()
    document.getElementById('innerWrapper').addEventListener('scroll', this.changeNavBoxStatue)
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }
}
</script>

<style lang='scss' scoped>
.service-book-box {
  width: 100%;
  height: 70px;
  margin-top: 44px;
  background: #fff;
  border-top: 7px solid #f6f6f6;
}
.service-add,
.service-look {
  position: relative;
  width: 140px;
  height: 44px;
  line-height: 44px;
  background: RGBA(153, 153, 153, 0.1);
  border-radius: 22px;
  border: 0.5px solid #fbf6f6;
  box-sizing: border-box;
}
.service-add span,
.service-look span {
  text-align: center;
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  color: #333;
}
.service-add {
  float: left;
  margin-left: 12px;
}
.service-look {
  float: right;
  margin-right: 12px;
}
.mint-navbar {
  margin: 11px 0px;
  background: #fff;
}
.mint-navbar .mint-tab-item {
  background-color: transparent;
  padding: 0px;
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: none;
  a::after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    right: 3px;
    top: -6px;
    background: url('../../../../assets/img/see1_icon.svg') no-repeat;
    background-size: 100% 100%;
  }
  a {
    border-color: #1787dd;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px 0.5px 4.5px 0.5px rgba(23, 135, 221, 0.3);
    span {
      color: #1787dd;
    }
  }
}
.reminder-content {
  font-size: 13px;
  color: rgba(76, 76, 76, 1);
  line-height: 20px;
  padding: 0 15.5px;
  text-align: left;
  word-break: break-word;
}
.mint-navbar.is-fixed {
  top: 33px;
  padding: 11px 0px;
  border-top: 7px solid #f6f6f6;
  border-bottom: 0.5px solid #eee;
  box-shadow: 0 0px 0px #ebebeb;
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: none;
  a.selecte2::after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    right: 3px;
    top: -6px;
    background: url('../../../../assets/img/add1_icon.svg') no-repeat;
    background-size: 100% 100%;
  }
  a.selecte2 {
    border-color: #1787dd;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px 0.5px 4.5px 0.5px rgba(23, 135, 221, 0.3);
  }
  span {
    color: #1787dd;
  }
}
.mint-tab-container {
  position: static;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .service-add {
    margin-left: 50px;
  }
  .service-look {
    margin-right: 50px;
  }
}

//游戏客服的特殊样式
.service-top {
  border-top: none;
  margin-top: 0px;
  .mint-navbar.is-fixed {
    top: -7px;
  }
  .mint-navbar {
    margin: 0;
    padding: 15px 0;
  }
}
// .service-content-top {
//   padding-top: 70px !important;
// }

.game-service-top {
  position: static;
  margin-top: -10px !important;
  z-index: 100;
}
// @-moz-document url-prefix() {
//   .game-service-top {
//     position: absolute !important;
//   }
// }
</style>
