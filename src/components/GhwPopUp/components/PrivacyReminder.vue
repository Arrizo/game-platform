<template>
  <div>
    <ghw-pop-up :isShowPopUp="isShowReminder" :isShowClose="false" :isShowMask="!isShowPolicy">
      <div slot="title">
        {{$t('message.buoy.privacy.privacyReminder')}}
      </div>
      <div slot="content" class="reminder-content">
        {{$t('message.buoy.privacy.privacyDesc')}}
      </div>
      <div slot="btn" class="add-game-btn">
        <ghw-btn :type="'popup'" :inputValue="$t('message.buoy.privacy.agree')" :size="'public'" :ownStyle="'blue-btn'" :inputType="'button'" @triggerEvent="agreePrivacy"></ghw-btn>
      </div>
      <div slot="tipMessage" class="reminder-tip">
        <p>{{$t('message.buoy.privacy.pressClick')}}</p>
        <a href="#" @click="isShowPolicy=true">{{$t('message.buoy.privacy.privacy')}}</a>
      </div>
    </ghw-pop-up>
    <privacy-policy :isShowPolicy="isShowPolicy" @closePolicy="isShowPolicy = false" :privacyUrl="privacyUrl" :setIsShowPopup="true"></privacy-policy>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwPopUp/components/PrivacyReminder.vue
* @desc 隐私政策提醒页
* @author yang huiru
* @date 2018.7.09
* @example 调用示例
* <privacy-reminder></privacy-reminder>
*/
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
import PrivacyPolicy from '@/components/GhwPopUp/components/PrivacyPolicy.vue'
import { agreePrivacyPolicy } from '@/services'
// import StoreUtil from '@/utils/StoreUtil'
import * as AnalyticsEnv from '@/business_modules/apis/analyticsEnv'
import { mapState } from 'vuex'
import * as constVar from '@/config/const'
import setCookie from '@/utils/setCookie'
export default {
  name: 'PrivacyReminder',
  extends: {},
  props: {
    isShowReminder: {
      type: Boolean,
      default: false
    },
    privacyUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowPolicy: false
    }
  },
  computed: {
    ...mapState({
      h5Token: state => state.user.userObj.h5Token,
      sdkToken: state => state.user.userObj.sdkToken,
      userId: state => state.user.userObj.userId
    })
  },
  components: {
    GhwPopUp,
    GhwBtn,
    PrivacyPolicy
  },
  watch: {
  },
  methods: {
    agreePrivacy () {
      var obj = {
        sdkVer: AnalyticsEnv.getSdkVer(),
        sdkType: AnalyticsEnv.getSdkType(),
        os: AnalyticsEnv.getOs(),
        clientId: AnalyticsEnv.getClientId(),
        appId: AnalyticsEnv.getAppId(),
        runPlatform: AnalyticsEnv.getRunPlatform(),
        h5Token: this.h5Token,
        sdkToken: this.sdkToken,
        userId: this.userId
      }
      this.$emit('closeReminder')
      agreePrivacyPolicy(obj).then(res => {
        if (res.code === constVar.API_CODE_SUCC) {
          this.$store.dispatch('setPrivacyUrl', { privacyUrl: '-1' })
          setCookie('privacyUrl', '-1')
        } else {
          setTimeout(() => {
            this.agreePrivacy()
          }, 3000)
        }
      }, error => {
        setTimeout(() => {
          this.agreePrivacy()
        }, 3000)
        console.log(error)
      })
    }
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
.reminder-content {
  font-size: 13px;
  color: rgba(76, 76, 76, 1);
  line-height: 20px;
  padding: 0 12px;
  text-align: justify;
  word-wrap: break-word;
}
.add-game-btn {
  & /deep/ .button-popup{
        float: none;
  }
}
.reminder-tip {
  margin: auto;
  padding: 5px 0 9px 0;
  text-align: center;
  line-height: 14px;
  font-size: 9px;
  p {
    width: 100%;
    text-align: center;
    color: #999999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 9px;
  }
  a {
    color: #1787dd;
    text-decoration: underline;
  }
}
</style>
