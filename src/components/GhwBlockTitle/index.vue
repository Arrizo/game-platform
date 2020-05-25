<template>
  <div>
    <div class="clearfix block-header" :class="[customStyle]">
      <div class="played-lf">{{titleName}}</div>
      <router-link :to="routerName" class="played-rg" v-if="isShowMore">{{$t('message.public.more')}}</router-link>
    </div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwBlockTitle
* @desc 带“更多”按钮的标题栏及普通标题栏
* @author yang huiru
* @date 2018.5.30
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,可选
* @param {Boolean} [isShowMore] - 是否显示更多操作,可选
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
export default {
  name: 'GhwBlockTitle',
  extends: {},
  props: {
    titleName: {
      type: String,
      default: ''
    },
    routerName: {
      type: Object,
      default () {
        return {}
      }
    },
    isShowMore: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
.played-lf,
.played-rg {
  height: 30px;
  line-height: 30px;
  color: #1787dd;
  font-size: 11.5px;
}
.played-lf {
  float: left;
  margin-left: 14px;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  height: 18px;
  line-height: 18px;
}
.played-rg {
  width: 35px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  background: rgba(224, 224, 224, 1);
  border-radius: 7.5px;
  float: right;
  margin-right: 12px;
  font-size: 10px;
  color: rgba(128, 128, 128, 1);
}
.block-header {
  border-bottom: none;
  padding-top: 16px;
  padding-bottom: 7px;
}
.played-header {
  border-bottom: 0.5px solid rgba(241, 241, 241, 1);
  padding-top: 14px;
  padding-bottom: 14px;
}
.personal-title{
  padding-bottom: 0;
}
</style>
