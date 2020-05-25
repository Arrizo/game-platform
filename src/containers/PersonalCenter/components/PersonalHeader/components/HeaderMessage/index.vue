<template>
  <div class="heads-lf" v-if="MessageType==='default'">
    <!-- <h3>{{userName}}</h3> -->

    <span>ID : {{userId}}</span>
  </div>
  <div class="service-heads-lf" v-else-if="MessageType==='detailed'" :class="{'service-marging':isPlaying}">
    <h5>{{$t('message.me.checkTicket.ticketNo')}}</h5>
    <span>#{{queryId}}</span><br>
    <h5>{{$t('message.me.checkTicket.game')}}</h5>
    <span>{{appName}}</span><br/>
    <!-- <h5>{{$t('message.me.checkTicket.server')}}:</h5>
    <span>{{serverName}}</span><br/> -->
    <h5>{{$t('message.me.checkTicket.characterName')}}</h5>
    <span>{{roleName}}</span><br/>
    <h5> {{$t('message.me.checkTicket.problemCategory')}}</h5>
    <span class="service-over">{{ticketTypeName}}</span><br/>
    <h5> {{$t('message.me.checkTicket.email')}}</h5>
    <span>{{email}}</span>
  </div>
</template>
<script>
/**
 * @desc 用户头部的信息排版格式
 * @author chenzechao
 * @date 2018.5.28
 * @param {String} MessageType-返回头部信息的排版
 * @param {String} userName-返回用户的昵称
 * @param {Number} userId-用户的id
 * @param {Number} queryId-用户编号
 * @param {String} appName-游戏名称
 * @param {String} serverName-服务器名称
 * @param {String} roleName-角色名
 * @param {String} ticketTypeName-问题类别
 * @param {String} email-邮箱
 * @example 调用实例 <header-message :userName="userName" :userId="userId" :MessageType="MessageType" :queryId="queryId" :appName="appName" :serverName="serverName" :roleName="roleName" :ticketTypeName="ticketTypeName" :email="email"/>
 */
import { mapState } from 'vuex'
export default {
  name: 'HeaderMessage',
  props: {
    MessageType: {
      type: String,
      default: 'default'
    },
    userName: {
      type: String,
      default: ''
    },
    userId: {
      type: [String, Number],
      default: null
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
    }
  },
  computed: {
    ...mapState({
      isPlaying: state => state.user.isPlaying
    })
  }
}
</script>
<style lang="scss" scoped>
.heads-lf {
  float: left;
  margin-left: 11px;
  text-align: right;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.heads-lf h3 {
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  color: #333;
  margin-top: 15px;
  line-height: 10px;
}
.heads-lf span {
  color: #666;
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  color: #666666;
}

.service-heads-lf {
  display: inline-block;
  vertical-align: middle;
  padding: 14px 0px 14px 12px;
  color: #333;
  width: 100%;
  line-height: 20px;
  background: #fff;
  margin-top: 51px;
  box-shadow: 0.5px 5px 5px rgba(153, 153, 153, 0.1);
}
.service-heads-lf span {
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  font-family: 'Microsoft YaHei';
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.service-heads-lf h5 {
  display: inline;
  font-family: 'Microsoft YaHei';
  font-size: 13px;
  color: #999;
}
.service-heads-lf .service-over {
  width: 60%;
}
.service-marging{
  margin-top: 0px;
}
</style>
