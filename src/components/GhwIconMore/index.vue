<template>
  <div class="rank-more" v-if="isNoMoredata||loadNextPage" :class="{'bottom-text': !isShowBottomText}">
    <!-- <div class="nomoredata" v-if="isNoMoredata">暂时无更多数据</div> -->
    <div class="nomoredata" v-if="isNoMoredata&&isShowBottomText&&!isNoContent">—— {{$t('message.public.bottomLine')}} ——</div>
    <div class="loadimg" v-if="loadNextPage">
      <img :src="loadSrc" alt="">
    </div>
  </div>
</template>
<script>
import iconArrowDown from '@/assets/img/down.png'
import loadGif from '@/assets/img/loading-fish.gif'
import loadSvg from '@/assets/img/loading-fish.svg'
import platform from 'platform'
// import loadGif from '@/assets/img/loading-fish.svg'
/**
* 下拉加载
* @module @/components/GhwIconMore
* @desc 下拉加载
* @author yang huiru
* @date 2018.5.31
* @param {Boolean} [isNoMoredata]    - 是否加载完毕，已无更多数据,必传
* @param {Boolean} [loadNextPage] - 是否显示加载下一页数据的鲸鱼,可选
* @example 调用示例
*  <ghw-icon-more  :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage"/>
*/
export default {
  name: 'GhwIconMore',
  data () {
    return {
      iconArrowDown,
      loadGif,
      loadSvg,
      loadSrc: ''
    }
  },
  props: {
    isNoMoredata: {
      type: Boolean,
      default: true
    },
    loadNextPage: {
      type: Boolean,
      default: false
    },
    isShowBottomText: {
      type: Boolean,
      default: true
    },
    isNoContent: {
      type: Boolean,
      default: false
    }
  },
  watch: {
  },
  methods: {
  },
  created () {
    if (~platform.name.indexOf('IE')) {
      this.loadSrc = this.loadGif
    } else {
      this.loadSrc = this.loadSvg
    }
  }
}

</script>
<style lang="scss" scoped>
.nomoredata {
  width: 100%;
  text-align: center;
  font-size: 9px;
  color: #999999;
}
.rank-more {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  // padding-bottom: 10px;
  text-align: center;
  background-color: #f6f6f6;
}
.loadimg {
  width: 100%;
  margin: auto;
  // padding-top: 10px;
  padding-bottom: 10px;
  img {
    width: 45px;
  }
}
.bottom-text {
  padding: 0;
}
</style>
