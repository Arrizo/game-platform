<template>
  <div>
    <iframe :src="iframeSrc" frameborder="0" ref="iframe">
    </iframe>
    <!-- <div class="gameLoadedIcon" v-if="showGameloaed"><img :src="gameLoaded"></div> -->
  </div>
</template>

<script>
import gameLoaded from '@/assets/img/loading-fish.svg'
export default {
  name: 'ExternalIframeWrapper',
  extends: {},
  props: {},
  data: function () {
    return {
      iframeSrc: '',
      loadinggame: false,
      gameLoaded,
      showGameloaed: true
    }
  },
  computed: {
  },
  component: {},
  watch: {

  },
  methods: {
  },
  created () {
  },
  beforeMount () { },
  mounted () {
    this.iframeSrc = this.$route.query.url
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>

<style lang="scss" scoped>
iframe {
  min-height: calc(100vh - 2px);
  width: 100%;
}
// .gameLoadedIcon {
//   height: 100%;
//   width: 100%;
//   text-align: center;
//   position: absolute;
//   padding-top: 25%;
//   left: 0px;
//   top: 0px;
//   background: #fff;
// }
</style>
