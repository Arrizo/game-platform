<template>
  <div>
    <div class="share-mask" @click.stop="exitShare" v-if="isShareGame">
    </div>
    <div class="share-box" :class="{'show-share':isShareGame,'hide-share':isHideGame}">
      <div class="share-way clearfix">
        <div v-for="(item,index) in shareWayList" :key="'item'+index" class="share-box-item">
          <div>
            <img :src="getShareIcon(item.platform)" alt="" :id="item.platform" @click="shareGame(item.platform,item.shareLink)">
          </div>
          <p>{{getShareWayName(item.platform)}}</p>
        </div>
        <div class="share-box-item">
          <div>
            <img :src="copyLinkImg" alt="" @click="copyGameLink" :data-clipboard-text="locationHref" class="copy-href">
          </div>
          <p>{{$t('message.buoy.addShortcutData.copyLink')}}</p>
        </div>
      </div>
      <div class="share-cancle" @click="exitShare">{{$t('message.public.cancel')}}</div>
    </div>
  </div>
</template>
<script>
import FBImg from '@/assets/img/facebook.svg'
import FBMImg from '@/assets/img/facebook-messgener.svg'
import TWImg from '@/assets/img/twitter.svg'
import GGPImg from '@/assets/img/google.svg'
import LIImg from '@/assets/img/linkedin.svg'
import copyLinkImg from '@/assets/img/copy-link.svg'
import { getShareInfo } from '@/services'
import ShareUtils from '@/utils/ShareUtils.js'
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import Toast from '@/components/GhwToast/index.js'
/**
* 公共标题栏
* @module @/components/GhwStaffFloat/components/ShareGame
* @desc 浮标的分享
* @author yang huiru
* @date 2018.7.23
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,可选
* @param {Boolean} [isShowMore] - 是否显示更多操作,可选
* @example 调用示例
* <share-game></share-game>
*/
export default {
  name: 'ShareGame',
  extends: {},
  props: {
    isShareGame: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      shareWayList: [],
      isHideGame: false,
      FBImg,
      FBMImg,
      TWImg,
      GGPImg,
      LIImg,
      copyLinkImg,
      locationHref: ''
    }
  },
  computed: {
    ...mapState({
      appId: state => state.user.appId
    })
  },
  components: {},
  watch: {
    // isShareGame () {
    //   this.isHideGame = true
    // }
  },
  methods: {
    // 复制游戏链接
    copyGameLink () {
      let clipboard = new Clipboard('.copy-href')
      clipboard.on('success', e => {
        console.log('复制成功')
        Toast({
          message: this.$t('message.buoy.addShortcutData.linkCopied'),
          iconClass: 'iconfont icon-toast-tick'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    // 获取分享方式
    getShareWay () {
      var obj = {
        appId: this.appId
      }
      getShareInfo(obj).then(res => {
        if (res.data.shareList) {
          this.shareWayList = res.data.shareList
        }
      })
    },
    // 分享游戏
    shareGame (platform, shareLink) {
      ShareUtils(platform, shareLink)
    },
    // 获取分享方式的图标
    getShareIcon (platform) {
      switch (platform) {
        case 'FB':
          return this.FBImg
        case 'FBM':
          return this.FBMImg
        case 'TW':
          return this.TWImg
        case 'GGP':
          return this.GGPImg
        case 'LI':
          return this.LIImg
        default:
          return this.LIImg
      }
    },
    getShareWayName (platform) {
      switch (platform) {
        case 'FB':
          return 'Facebook'
        case 'FBM':
          return 'Facebook Messenger'
        case 'TW':
          return 'Twitter'
        case 'GGP':
          return 'Google Plus'
        case 'LI':
          return 'LinkedIn'
      }
    },
    exitShare () {
      this.isHideGame = true
      this.$emit('cancleShare')
    }
  },
  created () {
    this.locationHref = `${window.location.origin}?shareType=1&appId=${this.appId}`
  },
  beforeMount () { },
  mounted () {
    this.getShareWay()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.share-mask {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.share-box {
  position: absolute;
  left: 0;
  bottom: -260px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0px 0px;
  min-height: 156px;
  .share-way {
    width: 100%;
    padding: 0 12px 0 12px;
    .share-box-item {
      float: left;
      width: calc(33% - 17px);
      margin-top: 15px;
      &:nth-child(4n) {
        width: auto;
        margin-right: 0;
      }
      div {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        text-align: center;
        // box-shadow: 0px 1px 10px 0px rgba(102, 102, 102, 0.15);
        overflow: hidden;
      }
      img {
        width: 50px;
      }
      p {
        width: 52px;
        text-align: center;
        color: rgba(102, 102, 102, 1);
        font-size: 10px;
        margin-top: 8px;
        line-height: 10px;
        height: 20px;
      }
    }
  }

  .share-cancle {
    width: 100%;
    height: 50px;
    border-top: 0.5px solid rgba(238, 238, 238, 1);
    text-align: center;
    line-height: 50px;
    margin-top: 15px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
  }
}
.show-share {
  animation: showShareGame 0.5s;
  animation-fill-mode: forwards;
}
.hide-share {
  animation: hideShareGame 0.5s;
  animation-fill-mode: forwards;
}
@keyframes showShareGame {
  from {
    bottom: -260px;
  }
  to {
    bottom: 0px;
  }
}
@keyframes hideShareGame {
  from {
    bottom: 0px;
  }
  to {
    bottom: -260px;
  }
}

/* 判断ipad */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  /* style */
  .share-way {
    padding: 0 8% 0 8% !important;
  }
}
</style>
