<template>
  <div>
    <div class="classify-lf">
      <img :src="typeIcon">
    </div>
    <div class="classify-rg">
      <h3>{{typeName}}</h3>
      <span>{{$t('message.miniApp.inTotal',{number:appCount})}}</span>
    </div>
  </div>
</template>
<script>
/**
* 小游戏分类icon
* @module @/containers/Game/components/CategoryItem
* @desc 小游戏分类
* @author yang huiru
* @date 2018.5.30
* @param {String} [typeIcon]    - 游戏分类图标
* @param {String} [typeName] - 游戏分类名字
* @param {Number} [appCount] - 游戏个数
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
export default {
  name: 'CategoryItem',
  extends: {},
  props: {
    typeIcon: {
      type: String,
      default: ''
    },
    typeName: {
      type: String,
      default: ''
    },
    appCount: {
      type: Number,
      default: 0
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
.classify-lf {
  float: left;
  width: 38px;
  height: 38px;
  font-size: 0;
  margin: 13px 0px 13px 10px;
  border-radius: 10px;
  overflow: hidden;
}
.classify-rg {
  float: right;
  width: 50%;
  text-align: right;
  margin: 17px 12px 0 0;
  font-family: 'MicrosoftYaHei';
}
.classify-rg h3 {
  font-size: 13px;
  margin-bottom: 8px;
  color: rgba(51, 51, 51, 1);
}
.classify-rg span {
  font-size: 9px;
  color: rgba(153, 153, 153, 1);
}
</style>
