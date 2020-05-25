
<template>
  <div>
    <div class="errpage">
      <div>
        <img :src="QrcodeUnusedImg" alt="">
        <p>{{$t("message.website.qrInvalid")}}</p>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 二维码过期失效
* @module @/containers/Common/Error/QrcodeUnused.vue
* @desc 扫描二维码过期失效
* @author yang huiru
* @date 2018.6.11
* @example 调用示例
* <ghw-load-gif :isShowLoadGif="isShowLoadGif.recommendationList"></ghw-load-gif>
*/
import QrcodeUnusedImg from '@/assets/img/qrcode-unused.png'
export default {
  name: 'QrcodeUnused',
  extends: {},
  props: {
  },
  data () {
    return {
      QrcodeUnusedImg
    }
  },
  computed: {
  },
  components: {},
  watch: {},
  methods: {

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
.errpage {
  width: 100%;
  height: 100%;
  position: absolute;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    p{
      color:rgba(153,153,153,1);
      margin-top: 14px;
      font-size: 13px;
    }
  }
}
</style>
