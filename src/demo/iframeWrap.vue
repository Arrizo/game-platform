<template>
  <div>
    <iframe :src="iframeSrc" frameborder="0"></iframe>
    子
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      iframeSrc: 'http://localhost:8080/#/home',
      domain: 'http://localhost:8080'
    }
  },
  mounted () {
    this.sendMsg()
    this.addListener()
  },
  methods: {
    sendMsg () {
      top.postMessage('testing', '*')
    },
    addListener () {
      window.addEventListener('message', function (e) {
        console.log('iframeWrap:::', e)
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
