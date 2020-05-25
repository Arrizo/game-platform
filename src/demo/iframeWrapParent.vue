<template>
  <div>
    <button @click="sendMsg()">    父</button>
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      iframeSrc: 'http://localhost:8080/#/test/iframe-wrapper',
      domain: 'http://localhost:8080'
    }
  },
  mounted () {
    this.sendMsg()
    this.addListener()
  },
  methods: {
    sendMsg () {
      window.frames[0].postMessage('testing', '*')
      this.iframeSrc = 'www.baidu.com'
    },
    addListener () {
      window.addEventListener('message', function (e) {
        console.log('iframeWrapParent:::', e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
iframe{
  min-height: 400px;
  width:100%
}
</style>
