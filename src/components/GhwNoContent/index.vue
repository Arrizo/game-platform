<template>
  <div v-if="isShowNoContent" class="no-content">
    <img :src=noContentImg>
    <p>{{$t('message.me.noContent')}}</p>
  </div>
</template>
<script>
/**
* 页面没数据
* @module @/components/GhwNoContent
* @desc 页面无数据时显示
* @author yang huiru
* @date 2018.5.31
* @param {Boolean} [isShowNoContent] - 是否目前页面无数据
* @example 调用示例
* <ghw-no-content :isShowNoContent="gameGuideArr.length===0"></ghw-no-content>
*/
import noContentImg from '@/assets/img/no-content.svg'
export default {
  name: 'GhwNoContent',
  extends: {},
  props: {
    isShowNoContent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      noContentImg,
      screenHeight: '218px'
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
.no-content {
  width: 100%;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  p {
    color: rgba(153, 153, 153, 1);
    margin-top: 15px;
    font-size: 13px;
  }
  img {
    width: 120px;
  }
}
</style>
