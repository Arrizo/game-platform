<template>
  <div class="played-box" v-show="showPlayedList">
    <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
    <!--显示玩过的游戏icon-->
    <div id="playedSwiper" class="played-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in playedSwiperArr" :key="'played'+index">
          <a @click.stop="playGame($event,item.appUrl,item.appId,item.appName)" class="played-icon">
            <img :src="item.appIconUrl">
            <!-- <span>{{item.appName}}</span> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 我玩过的游戏
* @module @/containers/Home/components/PlayedGameCont
* @desc 首页home我玩过的游戏
* @author yang huiru
* @date 2018.5.30
* @example 调用示例
* <played-game-cont></played-game-cont>
*/
import { getPlayedList } from '@/services'
import gameStart from '@/utils/gameStart'
import { mapState } from 'vuex'
import CookieUtil from '@/utils/CookieUtil'
import Swiper from 'swiper'
import GhwBlockTitle from '@/components/GhwBlockTitle'
export default {
  name: 'PlayedGameCont',
  extends: {},
  props: {
  },
  data () {
    return {
      showPlayedList: false,
      playedSwiperArr: [],
      playedSwiper: null,
      playedSwiperOption: {
        slidesPerView: 4.5, // 显示4.5个
        observer: true,
        zoom: false
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    GhwBlockTitle
  },
  watch: {
    isLogin (newvalue, oldvalue) {
      if (this.isLogin) {
        this.setPlayedList()
      }
    }
  },
  methods: {
    // 开始游戏
    playGame (event, url, appId, appName) {
      gameStart(this.isLogin, appId, appName, url, this)
    },
    // 获取已玩过游戏
    setPlayedList () {
      const obj = {
        userId: CookieUtil.getInstance().getSdkUserIdFromCookie(),
        userToken: CookieUtil.getInstance().getDecryptH5TokenFromCookie(),
        pageSize: 10,
        sdkToken: CookieUtil.getInstance().getDecryptSdkTokenFromCookie()
      }
      getPlayedList(obj).then(res => {
        if (res.data) {
          if (res.data.appList.length > 0) {
            this.showPlayedList = true
            this.playedSwiperArr = res.data.appList
          }
        }
      })
    }
  },
  beforeMount () { },
  mounted () {
    if (this.isLogin) {
      this.setPlayedList()
    }
    this.playedSwiper = new Swiper('#playedSwiper', this.playedSwiperOption)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.played-box {
  // position: relative;
  width: 100%;
  // height: 102px;
  // height: 90px;
  margin-top: 7px;
  background-color: #fff;
}
.played-swiper {
  // position: absolute;
  // left: 0;
  // top: 30px;
  width: 100%;
  padding-left: 10px;
  height: 60px;
  overflow: hidden;
}
.played-icon {
  display: block;
  margin-right: 18.5px;
  width: 50px;
}
.played-icon img {
  display: inline;
  border-radius: 8px;
}
</style>
