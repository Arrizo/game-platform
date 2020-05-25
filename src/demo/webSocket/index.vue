<template>
  <div>
    <div>
      <button id="connect" onclick="connect();">连接</button>
      <button id="disconnect" disabled="disabled" onclick="disconnect();">断开连接</button>
    </div>
    <div id="conversationDiv">
      <label>输入你</label><input type="text" id="name" v-model="iptData" />
      <button id="sendName" @click="clickButton('');">发送</button>
      <p id="response"></p>
      <p id="response1"></p>
    </div>
  </div>
</template>
<script>
var Stomp = window.Stomp
var SockJS = window.SockJS
// import SockJS from '@/utils/sockjs'

export default {
  data () {
    return {
      iptData: '',
      sock: null,
      stompClient: null
    }
  },
  methods: {
    clickButton (val) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', val)
    },

    initWebsocket () {
      const self = this
      var socket = new SockJS('http://172.16.100.161/ws/user/init') // 1连接SockJS的endpoint是“wingSDK-endpoint”，与后台代码中注册的endpoint要一样。
      this.stompClient = Stomp.over(socket)// 2创建STOMP协议的webSocket客户端。
      this.stompClient.connect({}, function (frame) { // 3连接webSocket的服务端。
        console.log('开始进行连接Connected: ' + frame)
        // 4通过stompClient.subscribe（）订阅服务器的目标是'/topic/allUsers'发送过来的地址，与@SendTo中的地址对应。
        self.stompClient.subscribe('/topic/notify', function (respnose) {
          // showResponse(JSON.parse(respnose.body).responseMessage);
          console.log(JSON.parse(respnose.body).responseMessage)
        })
        // 4通过stompClient.subscribe（）订阅服务器的目标是'/user/' + userId + '/msg'接收一对一的推送消息,其中userId由服务端传递过来,用于表示唯一的用户,通过此值将消息精确推送给一个用户
        //            stompClient.subscribe('/user/' + userId + '/msg', function(respnose){
        //                console.log(respnose);
        //                showResponse1(JSON.parse(respnose.body).responseMessage);
        //            });
      })
    }

  },
  mounted () {
    this.initWebsocket()
  }
}
</script>
<style lang="scss" scoped>

</style>
