<template>
  <div>
    <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :appUrl="item.appUrl" :appTags="item.appTags" :appRate="item.appRate" :key="'rankItem'+index" @clickHandle="showDesc(item.appId)" :itemType="'game'" :appType="item.appType" :appPopularity="item.appPopularity"> </div>
    <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage" />
  </div>
</template>
<script>
import RankItem from '@/containers/Home/components/RankItem'
import GhwIconMore from '@/components/GhwIconMore'
import { getAppList } from '@/services'
export default {
  name: 'LatestMiniApps',
  extends: {},
  props: {
    loadLateNextPage: {
      type: Boolean,
      default: false
    },
    isStartService: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rankItemArr: [
      ],
      page: 0,
      isNoMoredata: false,
      loadNextPage: false
    }
  },
  computed: {
  },
  components: {
    RankItem,
    GhwIconMore
  },
  watch: {
    loadLateNextPage (val) {
      if (val && !this.isNoMoredata) {
        this.loadNextPage = true
        this.loadMoreGam()
      }
    },
    isStartService (val) {
      if (val) {
        this.setRankItemArr()
      }
    }
  },
  methods: {
    // 路由跳转到游戏详情页
    showDesc (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    },
    // 加载更多最新游戏
    loadMoreGam () {
      this.setRankItemArr()
    },
    // 获取最新游戏列表
    setRankItemArr () {
      this.page++
      const obj = {
        page: this.page,
        pageSize: 10,
        locationType: 11
      }
      getAppList(obj).then(res => {
        if (res.data) {
          if (res.data.appList.length === 0 || res.data.appList.length < obj.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.appList.length > 0) {
            this.rankItemArr.push(...res.data.appList)
          }
        }
        this.loadNextPage = false
        this.$emit('isCompleteLatestGame', 'finish')
      }, error => {
        console.log(error)
        this.$emit('isCompleteLatestGame', 'finish')
      })
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
</style>
