<template>
  <div>
    <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :appRate="item.appRate" :key="'rankItem'+index" @clickHandle="showDesc(item.appId)" :itemType="'game'" :appType="item.appType" :appPopularity="item.appPopularity"></div>
    <!--更多-->
    <ghw-icon-more :loadNextPage="loadNextPage" :isNoMoredata="isNoMoredata" />
  </div>
</template>
<script>
import RankItem from '@/containers/Home/components/RankItem'
import GhwHotRateGame from '@/components/GhwHotRateGame'
import GhwIconMore from '@/components/GhwIconMore'
import { getAppList } from '@/services'
export default {
  name: 'HotMiniApps',
  extends: {},
  props: {
    loadHotNextPage: {
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
      isNoMoredata: false,
      page: 0,
      loadNextPage: false
    }
  },
  computed () {
  },
  components: {
    RankItem,
    GhwHotRateGame,
    GhwIconMore
  },
  watch: {
    loadHotNextPage (val) {
      if (val && !this.isNoMoredata) {
        this.loadNextPage = true
        this.getMoreInfo()
      }
    },
    isStartService (val) {
      if (val) {
        this.setRankItemArr()
      }
    }
  },
  methods: {
    // 跳转到游戏详情页
    showDesc (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    },
    // 加载更多热门游戏
    getMoreInfo () {
      this.setRankItemArr()
    },
    // 加载热门游戏列表
    setRankItemArr () {
      this.page++
      const obj = {
        page: this.page,
        locationType: 10,
        pageSize: 10
      }
      getAppList(obj).then(res => {
        if (res.data) {
          if (res.data.appList.length === 0 || res.data.appList.length < obj.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.appList.length > 0) {
            this.rankItemArr.push(...res.data.appList)
          }
          this.$emit('isCompleteHotGame', 'finish')
          this.loadNextPage = false
        }
      }, error => {
        console.log(error)
        this.$emit('isCompleteHotGame', 'finish')
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
