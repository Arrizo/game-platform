<template>
  <div>
    <ghw-header-title @goBack="goBack" :iconStyle="'delete'" @hanlderMessage="deleteMsg"></ghw-header-title>
    <div class="message-detail clearfix">
      <!-- <div class="detail-title">{{messageDetail.notifTitle}}</div>
      <div class="detail-sender-time">
        <span>{{$t('message.me.messageDetail.sender')}}&nbsp;&nbsp;</span>
        <span>{{$t('message.me.myMessage.system')}}</span>
        <span class="detail-time">{{getTime(messageDetail.sendTime)}}</span>
      </div>
      <div v-html="messageDetail.notifContent" class="detail-content"></div> -->
      <ghw-info-detail :infoTitle="messageDetail.notifTitle" :infoPublishTime="messageDetail.sendTime" :infoDescription="messageDetail.notifContent"></ghw-info-detail>
      <!-- notifType 等于 5的时候不显示更多信息按钮 -->
      <span class="detail-more" v-if="messageDetail.notifType!=5" @click="linkTo(messageDetail.notifLink, messageDetail.notifType, messageDetail.id, messageDetail.appName)">{{$t('message.me.messageDetail.clickDetail')}}</span>
    </div>
    <ghw-pop-up :isShowPopUp="isDeleteMessage" @closePopUp="isDeleteMessage = false" @closeMask="isDeleteMessage = false" :popupClass="'pop-up-bottom'">
      <div slot="title" class="delete-message-content">
        {{$t('message.me.bindAcctData.confirmDelete')}}
      </div>
      <div slot="btn" class="add-game-btn">
        <ghw-btn :type="'cancle'" :inputValue="$t('message.public.cancel')" :inputType="'button'" @triggerEvent="isDeleteMessage = false"></ghw-btn>
        <ghw-btn :type="'popup'" :inputValue="$t('message.public.confirm')" :size="'public'" :inputType="'button'" @triggerEvent="setDeleteMessage"></ghw-btn>
      </div>
    </ghw-pop-up>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getMessageDetails, deleteMessage } from '@/services'
import gameStart from '@/utils/gameStart'
import GhwBtn from '@/components/GhwBtn'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import GhwPopUp from '@/components/GhwPopUp'
import GhwInfoDetail from '@/components/GhwInfoDetail'
export default {
  name: 'messageDetails',
  extends: {},
  props: {},
  data () {
    return {
      messageDetail: {},
      headerTitle: this.$route.query.title,
      isDeleteMessage: false,
      messageTab: this.$route.query.tab
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
    GhwPopUp,
    GhwInfoDetail
  },
  watch: {
    isLogin () {
      if (this.isLogin) {
        this.setMessageDetail()
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'MyMessageList', query: { 'tab': this.$route.query.tab } })
    },
    getTime: function (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD')
    },
    returnMsg () {
      this.$router.push({ name: 'MyMessageList' })
    },
    // 获取消息详情
    setMessageDetail () {
      var obj = {
        userId: this.userObj.userId,
        userToken: this.userObj.h5Token,
        notifId: this.$route.query.notifId
      }
      getMessageDetails(obj).then(res => {
        this.messageDetail = res.data
      },
      error => {
        console.log(error)
      })
    },
    // 删除消息
    setDeleteMessage () {
      var obj = {
        userId: this.userObj.userId,
        userToken: this.userObj.h5Token,
        notifId: this.$route.query.notifId
      }
      deleteMessage(obj).then(
        res => {
          this.$router.back(-1)
        },
        error => {
          console.log(error)
        }
      )
    },
    // 删除按钮
    deleteMsg () {
      this.isDeleteMessage = true
    },
    senderType: function (senderType) {
      // 0-系统、1-公告、2-活动、3-警告、4-攻略
      let senderValue = ''
      switch (parseInt(senderType)) {
        case 0:
          senderValue = this.$t('message.me.myMessage.system')
          break
        // 公告
        case 1:
          senderValue = this.$t('message.me.myMessage.announcement')
          break
        // 活动
        case 2:
          senderValue = this.$t('message.me.myMessage.event')
          break
        // 警告
        case 3:
          senderValue = this.$t('message.me.myMessage.warning')
          break
        // 攻略
        case 4:
          senderValue = this.$t('message.me.myMessage.guide')
      }
      return senderValue
    },
    // 详情页面跳转链接
    linkTo: function (url, type, id, name) {
      switch (parseInt(type)) {
        // 游戏
        case 0:
          gameStart(this.isLogin, id, name, url, this)
          break
        // 公告
        case 1:
          this.$router.push({ name: 'Information', query: { newsId: id, notifType: 1 } })
          break
        // 攻略
        case 2:
          this.$router.push({ name: 'Information', query: { newsId: id, notifType: 2 } })
          break
        // 活动
        case 3:
          this.$router.push({ name: 'Information', query: { newsId: id, notifType: 3 } })
          break
        case 4:
          this.$router.push({ name: 'ExternalIframeWrapper', query: { 'url': url, 'gameIcon': 'gameIcon' } })
          break
      }
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    this.setMessageDetail()
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () {
    this.$store.dispatch('isShowPopup', false)
  },
  // 实例销毁后调用
  destroyed: function () { }
}
</script>
<style lang="scss" scoped>
.message-detail {
  background-color: #fff;
  width: 100%;
  margin-bottom: 30px;
  .detail-content {
    font-size: 13px;
    color: rgba(76, 76, 76, 1);
    line-height: 20px;
    word-wrap: break-word;
    text-align: justify;
  }
  .detail-more {
    font-size: 12px;
    color: rgba(23, 135, 221, 1);
    line-height: 20px;
    border-bottom: 0.5px solid rgba(23, 135, 221, 1);
    float: right;
    margin: 0px 12px 20px 0px;
    cursor: pointer;
  }
}
.add-game-btn .wrap-box-btn{
  display: inline-block !important;
}
</style>
