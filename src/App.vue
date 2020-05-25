<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import * as postMessageEvent from '@/config/postMessageEvent'
import loadFile from '@/utils/loader'
import * as env from '@/config/env.js'

const FACEBOOK_SDK_URL = 'https://connect.facebook.net/en_US/sdk.js'
const GOOGLE_SDK_URL = 'https://apis.google.com/js/platform.js'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  watch: {
    isLogin (newvalue, oldValue) {
      console.log('oldValue::::::', oldValue)
      console.log('newvalue::::::', newvalue)
    }
  },
  methods: {
    showLoginPopupFN () {
      this.$store.dispatch('showLoginPopup')
    },
    hideLoginPopup () {
      this.$store.dispatch('hideLoginPopup')
    }
  },
  beforeCreate () {
    /* eslint-disable no-undef */
    // vpn开关没有配置或者设置为开的情况下加载google和facebook sdk
    const VPN_ENABLE = env.VPN_ENABLE_VALUE
    console.log('VPN_ENABLE', typeof (VPN_ENABLE))
    if (typeof (VPN_ENABLE) === 'undefined' || VPN_ENABLE === 1) {
      (function () {
        function asyncLoad () {
          loadFile('facebooksdk', FACEBOOK_SDK_URL, true, function () {
            console.log('Facebook sdk loaded successfully')
          })
          loadFile('googlesdk', GOOGLE_SDK_URL, true, function () {
            console.log('Google sdk loaded successfully')
          })
        }
        if (window.attachEvent) {
          window.attachEvent('onload', asyncLoad)
        } else {
          window.addEventListener('load', asyncLoad, false)
        }
      })()
    }
    /* eslint-able */
  },
  created () {
    this.$store.dispatch('userInit')
  },
  mounted () {
  }
}
</script>

<style>
#app {
  width: 100%;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  -ms-overflow-style: none;
}
</style>
