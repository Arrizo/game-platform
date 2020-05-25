<template>
  <div class="navBox nav-gameBox">
    <div class="classify-name">{{gameTypeList.length>0?locationTypeName+' ':' '}}{{$t("message.public.pMiniApp")}}</div>
    <router-link :to="{name:'Game',params:{tab:'gameNavBar3'}}" class="classify-others">{{$t("message.miniApp.others")}}&gt;</router-link>
  </div>
</template>
<script>
/**
* 小游戏分类标题栏
* @module @/containers/Gamestype/components/CategoryTitle
* @desc 小游戏分类标题栏
* @author yang huiru
* @date 2018.5.31
* @param {Array} [gameTypeList]    - 游戏分类游戏，数组
* @param {String} [locationTypeName] - 分类名
* @example 调用示例
* <category-title :gameTypeList="gameTypeList" :locationTypeName="locationTypeName"></category-title>
*/
export default {
  name: 'CategoryTitle',
  extends: {},
  props: {
    gameTypeList: {
      type: Array,
      default () {
        return []
      }
    },
    locationTypeName: {
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
.navBox {
  position: relative;
  width: 100%;
  height: 46px;
  background: no-repeat;
  background-size: 100% 100%;
  // z-index: 2;
}
.nav-gameBox {
  position: relative;
  background: #fffdfd;
  border-bottom: 1px solid #e0e0e0;
}
.classify-name {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60%;
  height: 100%;
  text-indent: 25px;
  font-weight: bold;
  font-size: 12px;
  line-height: 46px;
  color: #1787dd;
  background: url("../../../../assets/img/game_nav.png") no-repeat;
  background-size: 80% 100%;
}
.classify-others {
  position: absolute;
  top: 8px;
  right: 3%;
  line-height: 30px;
  color: #1787dd;
  font-size: 11px;
}
</style>
