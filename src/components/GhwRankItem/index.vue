<template>
  <div>
    <div v-for="(item,index) in gameAppList" :key="'game'+index" class="game-list-item clearfix" @click="ShowDetail(item.appId)">
      <ghw-game-icon :appIconSize="'small'" :appIconUrl="item.appIconUrl"></ghw-game-icon>
      <div class="item-rg">
        <div class="personal-played">
          <p class="app-name">{{item.appName}}</p>
          <p class="app-time">
            <span class="app-time-blue">{{getTime(item.lastPlayTime)}}&nbsp;</span>（
            <span>{{$t('message.me.playedCount',{number:item.playCount+' ',time:item.playCount>1?"s":""})}}</span>）
          </p>
        </div>
        <ghw-btn :inputType="'button'" :size="'ellipse'" :type="'public'" :inputValue="$t('message.public.play')" @triggerEvent="playGame(item.appId, item.appUrl,item.appName)" :ownStyle="'btn-top'" />
      </div>
    </div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwRankItem
* @desc 游戏item
* @author yang huiru
* @date 2018.6.29
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,可选
* @param {Boolean} [isShowMore] - 是否显示更多操作,可选
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
import GhwGameIcon from '@/components/GhwGameIcon'
import GhwBtn from '@/components/GhwBtn'
import gameStart from '@/utils/gameStart'
import { mapState } from 'vuex'
export default {
  name: 'GhwRankItem',
  extends: {},
  props: {
    titleName: {
      type: String,
      default: ''
    },
    gameAppList: {
      type: Array,
      default () {
        return []
      }
    },
    isShowMore: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    GhwGameIcon,
    GhwBtn
  },
  watch: {},
  methods: {
    playGame (appId, url, name) {
      gameStart(this.isLogin, appId, name, url, this)
    },
    // 时间转换格式方法
    getTime: function (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD')
    },
    ShowDetail (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
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
  .game-list-item {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 59px;
    padding-left: 12px;
    .item-rg {
      flex: 1;
      display: flex;
      align-items: center;
      height: 59px;
      border-bottom: 0.5px solid rgba(238, 238, 238, 1);
      margin-left: 10px;
      padding-right: 12px;
    }
    &:last-child .item-rg {
      border: none;
    }
    .personal-played {
      flex: 1;
      .app-name {
        width: 90%;
        color: rgba(51, 51, 51, 1);
        font-size: 13px;
        margin-bottom: 7px;
        height: 14px;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .app-time {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        color: #999999;
        .app-time-blue {
          color: #1787dd;
        }
      }
    }
  }
</style>
