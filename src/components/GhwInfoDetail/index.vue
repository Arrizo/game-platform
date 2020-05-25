<template>
  <div class="message-detail clearfix">
    <div class="detail-title">{{infoTitle}}</div>
    <div class="detail-sender-time">
      <span>{{$t('message.me.messageDetail.sender')}}&nbsp;&nbsp;</span>【
      <span>{{$t('message.me.myMessage.system')}}】</span>
      <span class="detail-time">{{getTime(infoPublishTime)}}</span>
    </div>
    <div v-html="infoDescription" class="detail-content"></div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwInfoDetail
* @desc 资讯详情页
* @author yang huiru
* @date 2018.7.19
* @param {String} [infoTitle]    - 资讯标题,可选
* @param {String} [infoSender] - 资讯发送人,可选
* @param {String} [infoPublishTime] - 资讯发布时间,可选
* @param {String} [infoDescription] - 资讯详细内容,可选
* @example 调用示例
* <ghw-info-detail :infoTitle="$t('message.homepage.playedApps')" :infoSender="''"></ghw-info-detail>
*/
export default {
  name: 'GhwInfoDetail',
  extends: {},
  props: {
    infoTitle: {
      type: String,
      default: ''
    },
    infoSender: {
      type: String,
      default: ''
    },
    infoPublishTime: {
      type: String,
      default: ''
    },
    infoDescription: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {},
  watch: {},
  methods: {
    getTime: function (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm')
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
.message-detail {
  background-color: #fff;
  width: 100%;
  padding: 15px 12px 30px 12px;
  margin-top: 51px;
  .detail-title {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    word-wrap: break-word;
    text-align: justify;
    line-height: 24px;
  }
  .detail-sender-time {
    font-size: 9px;
    color: rgba(153, 153, 153, 1);
    margin: 6px 0 16px 0;
    line-height: 9px;
    .detail-time {
      margin-left: 20px;
    }
  }
  .detail-content {
    font-size: 13px;
    color: rgba(76, 76, 76, 1);
    line-height: 20px;
    word-wrap: break-word;
    text-align: justify;
    padding-bottom: 34px;
  }
}
</style>
