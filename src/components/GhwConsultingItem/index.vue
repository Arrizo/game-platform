<template>
  <div style="background: #fff;">
    <router-link v-for="(item,index) in newsArr" :key="'newsItem'+index" :to="{ name: 'Information', query: { newsId: item.newsId, newType: getNewType(),fromRouterName: getRouterName(),appId: $route.query.appId}}" class="news-item">
      <div class="wrap-new-box">
        <p>{{item.newsTitle}}</p>
        <time>{{stamp2Date(item.newsPublishTime)}}</time>
      </div>
    </router-link>
  </div>
</template>
<script>
/**
* 资讯列表item
* @module @/components/GhwConsultingItem
* @desc 首页-资讯,游戏详情-资讯
* @author yang huiru
* @date 2018.5.30
* @param {Array} [appNewsArr]    - 资讯数组数据,必传
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
export default {
  name: 'GhwConsultingItem',
  extends: {},
  props: {
    newsArr: {
      type: Array,
      default () {
        return []
      }
    },
    subNavBar: {
      type: String,
      default: ''
    },
    appId: {
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
    stamp2Date (time) {
      if (time == null) {
        return ''
      }
      time = parseInt(time)
      return this.$moment(new Date(time)).format('YYYY-MM-DD HH:mm')
    },
    getNewType () {
      return this.subNavBar
    },
    getRouterName () {
      return this.$route.name
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
.news-item {
  display: block;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrap-new-box {
  height: 58px;
  width: 94%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.5px solid #eee;
}
.news-item p {
  color: #333;
  font-size: 13px;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.news-item time {
  color: #999;
  font-size: 9px;
}
</style>
