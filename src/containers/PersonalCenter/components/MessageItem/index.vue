<template>
  <div>
    <div v-for="(item,index) in myMessageList" :key="'list'+index" @click="showMessageDetail(item.notifId)" class="message-item">
      <p class="item-title" :class="{'red-item-title':showRedColor}">{{item.notifTitle}}</p>
      <p class="item-time-sender">
        <span>{{$t('message.me.messageDetail.sender')}}&nbsp;&nbsp;</span>
        <span class="sender">【{{$t('message.me.myMessage.system')}}】</span>
        <span>{{getTime(item.sendTime)}}</span>
      </p>
    </div>
  </div>
</template>
<script type="text/babel">
/**
* input输入框
* @module @/containers/PersonalCenter/components/MessageItem
* @desc  自定义input输入框
* @author yang.huiru
* @date 2018.7.02
* @param {Array} [myMessageList]    - 消息数组
* @param {Boolean} showRedColor -显示标题的颜色
* @example 调用示例
* <message-item :myMessageList="readMessageList"></message-item>
*/
export default {
  name: 'MessageItem',
  extends: {},
  props: {
    myMessageList: {
      type: Array,
      default () {
        return []
      }
    },
    navBar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showRedColor: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
  },
  watch: {

  },
  methods: {
    getTime (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm')
    },
    // 信息列表详情
    showMessageDetail (notifId) {
      this.$router.push({ name: 'MessageDetail', query: { 'notifId': notifId, 'tab': this.navBar, 'title': this.title } })
    }
  },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.message-item {
  width: 100%;
  height: 46px;
  // display: flex;
  // align-items: center;
  border-bottom: 0.5px solid rgba(238, 238, 238, 1);
  padding: 0 12px;
  &:last-child {
    border-bottom: none;
  }
  .item-title {
    width: 100%;
    color: rgba(51, 51, 51, 1);
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // height: 15px;
    // line-height: 12px;
    margin-top: 15px;
  }
  .red-item-title {
    color: rgba(51, 51, 51, 0.6);
  }
  .item-time-sender {
    width: 100%;
    color: rgba(153, 153, 153, 1);
    font-size: 9px;
    margin-top: 9px;
    height: 10px;
    line-height: 10px;
    margin-bottom: 9px;
    .sender {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
