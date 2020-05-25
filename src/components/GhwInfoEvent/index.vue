<template>
  <div>
    <div class="event-box" v-for="(item,index) in eventArr" :key="'event'+index" @click="getInfoDetail(item.newsId,item.newsTypeKey)">
      <div class="wrap-img-box">
        <img :src="item.eventBanner">
        <span class="iconfont event-tips" :class="['game-'+getGameTips(item.eventStatus)]">{{getGameContent(item.eventStatus)}}</span>
      </div>
      <p class="event-title">{{item.newsTitle}}</p>
      <span class="event-time">{{$t('message.public.info.time')}} {{getTimeFormat(item.eventStartTime)}} — {{getTimeFormat(item.eventEndTime)}}</span>
    </div>
  </div>
</template>
<script>
/**
* 资讯列表event
* @module @/components/GhwInfoEvent
* @desc 首页-资讯-公告
* @author chenzechao
* @date 2018.5.30
* @param {Array} [eventArr]    - 资讯数组数据,必传
* @example 调用示例
* <ghw-info-event :eventArr:eventArr></ghw-info-event>
*/
export default {
  name: 'GhwInfoEvent',
  props: {
    eventArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    getGameTips (status) {
      let statustips = ''
      switch (parseInt(status)) {
        case 0:
          statustips = 'start icon-activelabel_begain'
          break
        case 1:
          statustips = 'starting icon-activelabel-onging'
          break
        case 2:
          statustips = 'over icon-activelabel-end'
      }
      return statustips
    },
    getGameContent (content) {
      let gameContent = ''
      switch (parseInt(content)) {
        case 0:
          gameContent = this.$t('message.public.info.coming')
          break
        case 1:
          gameContent = this.$t('message.public.info.ongoing')
          break
        case 2:
          gameContent = this.$t('message.public.info.finished')
      }
      return gameContent
    },
    getTimeFormat (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm')
    },
    getInfoDetail (newsId, newType) {
      this.$router.push({ name: 'Information', query: { newsId: newsId, newType: this.getNewType(newType), fromRouterName: this.$route.name, appId: this.$route.query.appId } })
    },
    getNewType (newType) {
      if (newType === 0) {
        return 'subNavBar1'
      } else if (newType === 1) {
        return 'subNavBar2'
      } else {
        return 'subNavBar3'
      }
    }
  },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.event-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Microsoft YaHei';
  padding: 10px 0px 0 0px;
  background-color: #fff;
  .event-title {
    width: 94%;
    color: #333;
    font-size: 13px;
    margin: 8px 0px 4px 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .event-time {
    width: 94%;
    color: #999;
    font-size: 9px;
   border-bottom: 0.5px solid #eee ;
  padding-bottom: 10px;
  }
}
.wrap-img-box {
  width: 94%;
  height: 111px;
  background: gray;
  position: relative;
  .event-tips {
    height: 22px;
    line-height: 22px;
    font-size: 9px;
    position: absolute;
    left: 0px;
    top: 0px;
    color: #fff;
    display: inline-block;
    padding: 0 13.5px 0 4px;
    border-bottom-right-radius: 12px;
    &::before {
      margin-right: 5px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.game-starting {
  background: rgba(250, 81, 81, 0.9);
}
.game-over {
  background: rgba(128, 128, 128, 0.9);
}
.game-start {
  background: rgba(23, 135, 221, 0.9);
}
</style>
