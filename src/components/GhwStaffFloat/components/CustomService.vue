<template>
  <div>
    <div class="service-mask" v-show="isShowService" @click.stop="exitService"></div>
    <div class="service-popup" :class="{'show-service': isShowService,'hide-service':isHideService}">
      <div class="hide-icon" @click.stop="exitService">
        <img :src="hideServiceImg" alt="">
      </div>
      <div class="service-pop-background" id="service_scroll">
        <ghw-warn-pop :isShowWarn="true" :warnContent="warnContent" :isChangeContent="isChangeContent" class="location" :serviceAnimation="true"></ghw-warn-pop>
        <ghw-header-title v-show="showServiceDiolag" :headerContent="$t('message.me.ticket.checkTicket')" @goBack="hiddenService"></ghw-header-title>
        <service-diolag v-if="showServiceDiolag"></service-diolag>
        <service-main v-else :serviceTitle='false' @serviceWarnContent='serviceWarnContent'></service-main>
      </div>
    </div>
  </div>

</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwStaffFloat/components/CustomService
* @desc 浮标的客服
* @author yang huiru
* @date 2018.7.23
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,可选
* @param {Boolean} [isShowMore] - 是否显示更多操作,可选
* @example 调用示例
* <custom-service></custom-service>
*/
import GhwWarnPop from '@/components/GhwWarnPop'
import hideServiceImg from '@/assets/img/returnNav.svg'
import serviceMain from '@/containers/PersonalCenter/MessageService/ServiceMain'
import serviceDiolag from '@/containers/PersonalCenter/MessageService/ServiceDialog'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import { mapState } from 'vuex'
export default {
  name: 'CustomService',
  extends: {},
  props: {
    isShowService: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isHideService: false,
      hideServiceImg,
      warnContent: '',
      isChangeContent: false
    }
  },
  computed: {
    ...mapState({
      showServiceDiolag: state => state.home.showServiceDiolag
    })
  },
  components: {
    serviceMain,
    serviceDiolag,
    GhwHeaderTitle,
    GhwWarnPop
  },
  watch: {
    // isShowService () {
    //   this.isHideService = true
    // },
    showServiceDiolag () {
      if (this.showServiceDiolag) {
        let ele = document.getElementById('service_scroll')
        setTimeout(() => {
          ele.scrollTop = ele.scrollHeight
        }, 200)
      }
    }
  },
  methods: {
    hiddenService () {
      this.$store.dispatch('showServiceDiolag', false)
    },
    exitService () {
      this.$emit('closeService')
      this.isHideService = true
    },
    serviceWarnContent (content, isChange) {
      this.isChangeContent = isChange
      this.warnContent = content
    }
  },
  beforeMount () { },
  mounted () {
    // document.getElementById('service_scroll').addEventListener('scroll')

  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.service-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.service-popup {
  position: absolute;
  width: 100%;
  height: 90%;
  bottom: -90%;
  left: 0;
  .hide-icon {
    width: 130px;
    height: 25px;
    background: rgba(238, 238, 238, 1);
    border-radius: 5px 5px 0px 0px;
    text-align: center;
    margin: auto;
    line-height: 25px;
    img {
      width: 7px;
      height: 13px;
      transform: rotate(-90deg);
      vertical-align: middle;
    }
  }
  .service-pop-background {
    width: 100%;
    height: calc(100% - 25px);
    background-color: #f6f6f6;
    border-radius: 10px 10px 0px 0px;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
  }
}
.image-upload {
  position: fixed !important;
  bottom: 0px !important;
}
.show-service {
  animation: showService 0.5s;
  animation-fill-mode: forwards;
  -moz-animation: showService 0.5s;
  -moz-animation-fill-mode: forwards;
}
.wrap-title-box {
  position: static !important;
}
.location {
  display: none;
  opacity: 0;
  position: absolute !important;
  width: 100%;
  top: 25px;
  z-index: 1 !important;
  border-radius: 10px 10px 0px 0px;
}
.hide-service {
  animation: hideService 0.5s;
  animation-fill-mode: forwards;
}
@keyframes showService {
  from {
    // bottom: -515px;
    bottom: -90%;
  }
  to {
    bottom: 0px;
  }
}
@keyframes hideService {
  from {
    bottom: 0px;
  }
  to {
    // bottom: -515px;
    bottom: -90%;
  }
}
</style>
