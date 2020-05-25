
<template>
  <div>
    <div class="not-found">
      <div>
        <img :src="notFoundImg" alt="">
        <p>{{$t('message.public.pageNotExist')}}</p>
        <ghw-btn :inputType="'button'" :inputValue="$t('message.public.backHome')" :size="'public'" :type="'ellipse'" class="btn-ellipse" @triggerEvent='backHome' :ownStyle="'btn-top'"/>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 二维码过期失效
* @module @/containers/Common/Error/NotFound.vue
* @desc 扫描二维码过期失效
* @author yang huiru
* @date 2018.6.11
* @example 调用示例
* <not-found></not-found>
*/
import notFoundImg from '@/assets/img/not-found.png'
import ghwBtn from '@/components/GhwBtn'
export default {
  name: 'NotFound',
  extends: {},
  props: {
  },
  data () {
    return {
      notFoundImg
    }
  },
  computed: {
  },
  components: {
    ghwBtn
  },
  watch: {},
  methods: {
    backHome () {
      this.$router.push({ name: 'Home' })
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
.not-found {
  width: 100%;
  height: 100%;
  position: absolute;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    p {
      width: 250px;
      font-size: 13px;
      color: rgba(153, 153, 153, 1);
      line-height: 19px;
      display: inline-block;
      margin-top: 24px;
    }
  }
  .btn-top {
    margin-top: 50px;
    width: 120px;
    height: 29px;
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
  }
}
.btn-ellipse {
  margin-top: 12px;
  display: inline-block;
}
</style>
