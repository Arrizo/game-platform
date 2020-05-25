<template>
  <div class="heads-box clearfix">
    <!-- 头像 -->
    <header-icon :userIcon='userIcon' :userIconSize="userIconSize" :uploading="uploading" />
    <!-- 头部信息 -->
    <header-message :userName="userName" :userId="userId" :MessageType="MessageType" :queryId="queryId" :appName="appName" :serverName="serverName" :roleName="roleName" :ticketTypeName="ticketTypeName" :email="email" />
    <!-- 头部按钮 -->
    <ghw-btn :type="type" :size="size" @triggerEvent="$emit('triggerEvent')" :inputType="inputType" :inputValue="inputValue" :class="[btnPosition]" />
  </div>
</template>

<script>
/**
* @desc 使用于用户的头部信息
* @author chenzechao
 * @date 2018.5.28
* @param {String} userIcon-用户头像
* @param {String} userName-用户昵称
* @param {Number} userId-用户的id
* @param {String} MessageType-显示不同的头部信息的类型
* @param {Number} [queryId] -留言的编号
* @param {String} [appName] -游戏名称
* @param {String} [serverName] -服务器名称
* @param {String} [roleName] -角色名
* @param {String} [ticketTypeName] -问题类别
* @param {String} [email] -邮箱
* @param {String} userIconSize-头像的大小
* @param {String} inputType-输入框的类型
* @param {String} [type] -按钮的样式类型
* @param {String} size-按钮的背景样式
* @param {String} btnPosition-按钮的位置
* @example 调用实例 <personal-header :userIcon="userObj.iconUrl" :userName="userObj.nickname" :userId="userObj.userId" :MessageType="'default'" :userIconSize="'large'" :size="'return'" @triggerEvent="goBack" :inputType="'button'"></personal-header>
*
 */
import HeaderIcon from './components/HeaderIcon'
import HeaderMessage from './components/HeaderMessage'
import GhwBtn from '@/components/GhwBtn'
export default {
  name: 'personalHeader',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    linkTo: {
      type: String,
      default: ''
    },
    userIcon: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userId: {
      type: [Number, String],
      default: null
    },
    MessageType: {
      type: String,
      default: ''
    },
    queryId: {
      type: Number,
      default: 0
    },
    appName: {
      type: String,
      default: ''
    },
    serverName: {
      type: String,
      default: ''
    },
    roleName: {
      type: String,
      default: ''
    },
    ticketTypeName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    userIconSize: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    uploading: {
      type: Boolean,
      default: false
    },
    inputValue: {
      type: String,
      default: ''
    },
    btnPosition: {
      type: String,
      default: ''
    }
  },
  components: {
    HeaderIcon,
    HeaderMessage,
    GhwBtn
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
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

<style lang="scss" scoped>
.heads-box {
  position: relative;
  width: 100%;
  padding: 8px 0;
  border-bottom: 2px solid #e0e0e0;
}
.btn-return {
  position: absolute;
  top: 24px;
  right: 7%;
}
.btn-rectangular{
  float: right;
  margin-right: 10px;
  margin-top: 23px;
}
</style>
