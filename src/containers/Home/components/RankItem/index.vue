<template>
  <div class="rank-item" @click="$emit('clickHandle')">
    <div class="rank-img">
      <img :src="appIconUrl">
    </div>
    <div class="rank-lf">
      <h3>{{appName}}</h3>
      <div v-if="itemType=='home'">
        <p>{{briefIntro}}</p>
        <div class="rank-lf-tag">
          <span v-for="appTag in appTags" :key="'appTag'+appTag.tagId">{{appTag.tagName}}</span>
        </div>
      </div>
      <div v-else-if="itemType=='game'|| itemType=='catagory'">
        <p class="star">
          <img v-for="(item,index) in parseInt(appRate)" :key="'iconStarFill'+index" :src="iconStarFill" @click="changeRate(index+1,contentId)">
          <img v-for="(item,index) in (5-parseInt(appRate))" :key="'iconStarHollow'+index" :src="iconStarHollow" @click="changeRate(appRate.lenght+index,contentId)">
        </p>
        <div class="rank-lfBtm">
          <em v-if="itemType=='game'">{{appType}}</em>
          <em v-if="itemType=='catagory'">{{locationTypeName}}</em>
          <em>{{$t("message.miniApp.popularity")}}：{{appPopularity|popularity}}</em>
        </div>
      </div>
    </div>
    <ghw-btn :inputType="'button'" :size="'ellipse'" :type="'public'" :inputValue="$t('message.public.play')" @triggerEvent="playGame($event,appUrl)" class="btn-ellipse" />
  </div>
</template>
<script>
/**
* 游戏列表item
* @module @/components/RankItem
* @desc 首页，小游戏页的游戏列表item
* @author yang huiru
* @date 2018.5.30
* @param {Number} [appId]    - 游戏应用id
* @param {String} [appIconUrl] - 游戏应用图片
* @param {String} [appName] - 游戏应用名
* @param {String} [briefIntro] - 一句话描述
* @param {String} [appUrl] - 游戏应用跳转url
* @param {Array} [appTags] - 应用标签，数组对象
* @param {Number} [appRate] - 应用评级
* @param {String} [itemType] - 页面类型：主页，游戏页
* @param {String} [locationTypeName] - catagory类型名称（国际化后的名称）
* @param {Number} [appPopularity] - 应用人气
* @param {String} [appType] - game的应用分类类型
* @example 调用示例
* <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr1" :appId="item.appId" :appIconUrl="item.appIconUrl" *:appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :key="'rankItem'+index" *@clickHandle="showDesc(item.appId)" :itemType="'home'"> </div>
*/
import iconList from '@/assets/img/list_icon.png'
import { mapState } from 'vuex'
import iconStarFill from '@/assets/img/star2.png'
import iconStarHollow from '@/assets/img/star.png'
import gameStart from '@/utils/gameStart'
import GhwBtn from '@/components/GhwBtn'
export default {
  name: 'RankItem',
  extends: {},
  props: {
    appId: {
      type: Number,
      default: 0
    },
    appIconUrl: {
      type: String,
      default: iconList
    },
    appName: {
      type: String,
      default: ''
    },
    briefIntro: {
      type: String,
      default: ''
    },
    appUrl: {
      type: String,
      default: ''
    },
    appTags: {
      type: Array,
      default () {
        return []
      }
    },
    appRate: {
      type: Number,
      default: 0
    },
    itemType: {
      type: String,
      default: ''
    },
    locationTypeName: {
      type: String,
      default: ''
    },
    appPopularity: {
      type: Number,
      default: 0
    },
    appType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      iconStarFill,
      iconStarHollow
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isPlaying: state => state.user.isPlaying
    })
  },
  components: {
    GhwBtn
  },
  watch: {},
  methods: {
    playGame (event, url) {
      gameStart(this.isLogin, this.appId, this.appName, url, this)
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
.star img {
  width: 10px;
  margin-top: 3px;
}
.rank-item {
  // position: relative;
  width: 100%;
  height: 77.5px;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  background: #fff;
}
.rank-img {
  float: left;
  display: block;
  margin-left: 10px;
  width: 58px;
  height: 55.6px;
  border-radius: 10px;
  overflow: hidden;
  img {
    height: 100%;
  }
}
.rank-lf {
  float: left;
  // position: relative;
  margin-left: 7px;
  width: 144px;
  height: 55.6px;
}
.rank-lf h3 {
  // position: absolute;
  margin-top: 6px;
  // top: 6px;
  // left: 0;
  font-weight: bold;
  color: #444444;
  font-size: 12px;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rank-lf p {
  // position: absolute;
  margin-top: 1px;
  // top: 23px;
  // left: 0;
  color: #848484;
  font-size: 9px;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// .rank-lf-tag {
//   // position: absolute;
//   // bottom: -5px;
//   // left: 0;
// }
.rank-lf-tag span {
  display: inline-block;
  margin-top: 7px;
  margin-right: 2px;
  line-height: 11px;
  text-align: center;
  font-size: 8px;
  color: #1787dd;
  padding: 2px 5px;
  border: 1px solid #1787dd;
  border-radius: 10px;
  overflow: hidden;
}
.btn-ellipse {
  float: right !important;
  margin-right: 10px;
  width: 68px !important;
  margin-top: 16px !important;
}

// .rank-lfBtm {
//   // position: absolute;
//   // bottom: 0px;
//   left: 0px;
// }
.rank-lfBtm span {
  display: inline-block;
  margin-top: 7px;
  margin-right: 2px;
  width: 30px;
  height: 13px;
  line-height: 14px;
  text-align: center;
  font-size: 8px;
  color: #1787dd;
  border: 1px solid #1787dd;
  border-radius: 10px;
}

.rank-lfBtm em {
  display: inline-block;
  margin-top: 3px;
  margin-right: 3px;
  font-style: normal;
  color: #1787dd;
  font-size: 8px;
  line-height: 20px;
}
</style>
