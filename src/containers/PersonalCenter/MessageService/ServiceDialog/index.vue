<template>
  <div>
    <!-- 头部信息 -->
    <ghw-header-title :headerContent="$t('message.me.ticket.checkTicket')" @goBack="goBack" v-if="!isPlaying"></ghw-header-title>
    <div class="service-dialog-content">
      <!--留言详情-->
      <div class="wrap-service" id="wrapService" ref="wrapService">

        <header-message :MessageType="'detailed'" :queryId="detailData.queryId" :appName="detailData.appName" :serverName="detailData.serverName" :roleName="detailData.roleName" :ticketTypeName="detailData.ticketTypeName" :email="detailData.email" :serviceHeaderLf="isPlaying" />
        <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadPerNextPage" :isShowBottomText='false' />
        <div class="service-dialog-box" v-for="(item, index) in detailData.queryConvDetail" :key="'dialog'+index">
          <service-comments :convType='item.convType' :convTime="item.convTime" :convContent="item.convContent" :convRate="item.convRate" :convUserIconUrl="item.convUserIconUrl" :attachment="item.attachment" :detailRoteList="detailRoteList" :convContentId="item.convContentId" @getstar="getComment"></service-comments>
        </div>
      </div>
      <!--追问-->
      <div v-if="detailData.queryStatus!==2">
        <!-- 用户追加评论 -->
        <div class="image-upload clearfix" id="imageUpload" :class="{'game-upload':isPlaying}" ref="imageUpload">
          <div class="input-textare clearfix">
            <input type="text" class="input-text" v-model="queryContent" @click="isOpenImage('isHasImage')" />
            <div class="service-image" @click="isOpenImage()"></div>
            <div class="service-send" :class="{'service-send-isselect':(images.length!==0||queryContent!=='')?true:false}" @click="submitFormDate"></div>
          </div>
          <query-content @confirm='getImages' :isHastextAre="false" v-show="isHasImage" :restImage='restImage'></query-content>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState } from 'vuex'
import { getMessageDetail, addMoreQuery, subInstantRate } from '@/services'
import QueryContent from '@/containers/PersonalCenter/components/QueryContent'
import ServiceComments from '@/containers/PersonalCenter/components/ServiceComments'
import HeaderMessage from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderMessage'
import PersonalHeader from '@/containers/PersonalCenter/components/PersonalHeader'
import GhwBtn from '@/components/GhwBtn'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import GhwIconMore from '@/components/GhwIconMore'
export default {
  name: 'serviceDialog',
  extends: {},
  props: {
    serviceTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      detailData: {},
      detailRoteList: {},
      images: [],
      page: 1,
      pageSize: 10,
      queryContent: '',
      queryId: this.$route.query.queryId,
      queryConvDetail: [],
      noMoreData: false,
      isHasImage: false,
      isNoMoredata: false,
      loadPerNextPage: false,
      isHasMoreData: false,
      restImage: false,
      isHasInput: true,
      // 追加留言默认值
      DEFAULT_TEXT: 'fbcdde0a177a1111' // 'SERVICE_DIALOG_DEFAULT_TEXT'
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj,
      squeryId: state => state.home.queryId,
      isPlaying: state => state.user.isPlaying
    })
  },
  components: {
    PersonalHeader,
    QueryContent,
    ServiceComments,
    GhwBtn,
    GhwHeaderTitle,
    HeaderMessage,
    GhwIconMore
  },
  watch: {
    isLogin () {
      if (this.isLogin) {
        this.setMessageDetail()
      }
    }
  },
  methods: {
    // 获取评星数量
    getComment (valueStar) {
      this.detailRoteList = valueStar
    },
    getImages (image, content) {
      this.images = image
      console.log('909090900', content)
      // this.queryContent = content
    },
    goBack () {
      console.log('0000000000')
      if (this.isPlaying) {
        this.$store.dispatch('showServiceDiolag', false)
      } else {
        this.$router.go(-1)
      }
    },
    setMessageDetail (isScroll) {
      console.log('-=-=-=-=-=-=-=-=-=-=23')
      let obj = {
        userToken: this.userObj.h5Token,
        queryId: this.$route.query.queryId || this.squeryId,
        page: this.page,
        pageSize: this.pageSize
      }

      getMessageDetail(obj).then(res => {
        if (res.data) {
          // 若数据小于10条啧无更多数据
          if (res.data.queryConvDetail.length < 10) {
            this.isNoMoredata = true
          } else {
            this.isNoMoredata = false
          }
          this.detailData = res.data
          var arr = res.data.queryConvDetail
          this.queryConvDetail = arr.concat(this.queryConvDetail)
          this.detailData.queryConvDetail = this.queryConvDetail
          this.loadPerNextPage = false
        }
        const list = this.detailData.queryConvDetail
        for (let i = 0; i < list.length; i++) {
          this.detailRoteList[list[i].convContentId] = list[i].convRate
        }
      }).then(() => {
        // 自动滚动到底部
        if (!isScroll) {
          let ws = document.getElementById('wrapService')
          let _this = this
          this.interValTimer = setInterval(function () {
            let wsTop = ws.scrollHeight - ws.clientHeight
            let wSpeed = Math.floor((wsTop - ws.scrollTop) / 6)
            // let eSpeed = Math.floor(iw.scrollHeight / 6)
            // let wSpeed = 2
            _this.isTop = true
            ws.scrollTop += wSpeed
            // if (ws.scrollTop + ws.clientHeight >= ws.scrollHeight) {
            if (wSpeed === 0) {
              clearInterval(_this.interValTimer)
              _this.interValTimer = null
              ws.removeEventListener('touchstart', () => {
                clearInterval(_this.interValTimer)
                _this.interValTimer = null
              })
            }
          }, 30)
          ws.addEventListener('touchstart', () => {
            clearInterval(_this.interValTimer)
            _this.interValTimer = null
            ws.removeEventListener('touchstart', () => {
              clearInterval(_this.interValTimer)
              _this.interValTimer = null
            })
          })
        }
      })
    },
    // 追加提问
    submitMoreQuery () {
      let obj = {
        userToken: this.userObj.h5Token,
        queryId: this.detailData.queryId,
        queryContent: this.queryContent === '' ? this.DEFAULT_TEXT : this.queryContent,
        attachments: JSON.stringify(this.images)
      }
      addMoreQuery(obj)
    },
    // 及时评分调用
    setSubInstantRate (key, value) {
      let objdata = {
        userToken: this.userObj.h5Token,
        replyContentId: key,
        rate: value
      }
      subInstantRate(objdata)
    },
    // 提交表单
    submitFormDate: function () {
      if (!this.queryContent.trim() && this.images.length === 0) {
        Toast({ message: this.$t('message.me.replyTicket.postReplyContentNotEmpty'), position: 'bottom' })
        return false
      }
      let _this = this
      for (let key in _this.detailRoteList) {
        if (_this.detailRoteList[key] > 0) {
          _this.setSubInstantRate(key, _this.detailRoteList[key])
        }
      }
      this.submitMoreQuery()
      this.queryConvDetail = []
      this.detailData.queryConvDetail = []
      this.page = 1
      this.queryContent = ''
      this.images.splice(0, this.images.length)
      this.isNoMoredata = true
      this.restImage = !this.restImage
      setTimeout(() => {
        this.setMessageDetail(true)
        setTimeout(() => {
          console.log('setMessageDetail.....')
          let ete = document.getElementById('wrapService').scrollHeight
          document.getElementById('wrapService').scrollTop = ete
        }, 100)
      }, 100)
    },
    // 加载更多提问
    // loadMoreMessageDetail () {
    //   var ele = document.getElementById('innerWrapper')
    //   let scrollTop = ele.pageYOffset || ele.scrollTop
    //   if (scrollTop === 0 && !this.noMoreData) {
    //     this.page++
    //     this.setMessageDetail()
    //   }
    // },
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('wrapService')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (scrollTop === 0 && !this.isNoMoredata) {
        this.page++
        this.loadPerNextPage = true
        this.setMessageDetail(true)
      }
    },
    isOpenImage (value) {
      this.isHasImage = value === undefined ? !this.isHasImage : true
      setTimeout(() => {
        let imageHeigth = document.getElementById('wrapService').scrollHeight
        document.getElementById('innerWrapper').scrollTop = document.body.scrollTop = imageHeigth
        if (this.isPlaying) document.getElementById('service_scroll').scrollTop = imageHeigth
      }, 100)
    },
    getDialogPositon () {
      let imgHeight = this.$refs.imageUpload.scrollHeight
      let SHeight = ''
      if (this.isPlaying) SHeight = document.getElementById('service_scroll').scrollHeight
      let THeight = document.getElementById('wrap_title_box').scrollHeight
      this.$refs.wrapService.style.height = this.isPlaying ? (SHeight - THeight - imgHeight) + 'px' : (document.documentElement.clientHeight - imgHeight) + 'px'
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted () {
    this.setMessageDetail()
    this.getDialogPositon()
    document.getElementById('wrapService').addEventListener('scroll', this.changeNavBoxStatue)
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用,切页面触发评分事件
  beforeDestroy () {
    for (let key in this.detailRoteList) {
      if (this.detailRoteList[key] > 0) {
        this.setSubInstantRate(key, this.detailRoteList[key])
      }
    }
  },
  // 实例销毁后调用
  destroyed: function () { }
}
</script>
<style lang='scss' scoped>
.service-dialog-content {
  width: 100%;
  margin: 0 auto;
  min-height: 200px;
}
.service-dialog-box {
  width: 100%;
  margin: 0px auto;
}
.input-textare {
  height: 50px;
  line-height: 45px;
  padding-left: 12px;
  border-bottom: 1px solid #eeeeee;
}
.input-text {
  width: 70%;
  height: 30px;
  padding: 0px 10px;
  background: #eeeeee;
  border-radius: 14px;
  margin-top: 10px;
  float: left;
}
.service-send,
.service-image {
  width: 23px;
  float: left;
}
.service-image {
  height: 17px;
  margin: 15px 0px 15px 14px;
  background: url('../../../../assets/img/upload_image.svg') no-repeat;
}
.service-send {
  height: 23px;
  margin: 13px 0px 13px 14px;
  background: url('../../../../assets/img/send.svg') no-repeat;
}
.service-send-isselect {
  background: url('../../../../assets/img/service2.svg') no-repeat;
}
.service-submit {
  margin-right: 14.25%;
  margin-left: 19.375%;
  margin-top: 12px;
}
.btn-ellipse {
  margin-top: 12px;
  display: inline-block;
}
.image-upload {
  width: 100%;
  background: #fff;
}
.wrap-service {
  background: #f6f6f6;
  padding-bottom: 20px;
  overflow: auto;
}
</style>
