<template>
  <div>

    <!-- 推荐1 -->
    <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr1" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :key="'rankItem'+index" @clickHandle="showDesc(item.appId)" :itemType="'home'"> </div>
    <!--热门小游戏1-->
    <hot-game-cont :titleName="$t('message.homepage.latestMiniApps')" :routerName="{ name: 'Game', params: { tab: 'gameNavBar2'} }" :hotItemsArr="hotItemsArr1"></hot-game-cont>
    <!-- 推荐2 -->
    <div v-if="rankItemArr2.length>0">
      <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr2" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :key="'rankItem'+index" :itemType="'home'" @clickHandle="showDesc(item.appId)"> </div>
    </div>
    <!--热门小游戏2-->
    <div v-if="rankItemArr2.length>0">
      <hot-game-cont :titleName="$t('message.homepage.latestMiniApps')" :routerName="{ name: 'Game', params: { tab: 'gameNavBar2'} }" :hotItemsArr="hotItemsArr2"></hot-game-cont>
    </div>
    <!-- 推荐3 -->
    <div v-if="rankItemArr3.length>0">
      <div class="rank-item" is="rank-item" v-for="(item,index) in rankItemArr3" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :key="'rankItem'+index" @clickHandle="showDesc(item.appId)" :itemType="'home'"> </div>
    </div>
    <div></div>
    <!--更多-->
    <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage" :isShowBottomText="false"/>
  </div>
</template>
<script>
import RankItem from '@/containers/Home/components/RankItem'
import HotGameCont from '@/containers/Home/components/HotGameCont'
import GhwIconMore from '@/components/GhwIconMore'
import loadGif from '@/assets/img/loading-fish.svg'
import { getAppList } from '@/services'
export default {
  name: 'RecommendationList',
  extends: {},
  props: {
    isLoadNextPage: {
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
      rankItemArr1: [
      ],
      hotItemsArr1: [],
      rankItemArr2: [],
      hotItemsArr2: [],
      rankItemArr3: [],
      rankItemLocationType: 5,
      hotItemsLocationType: 6,
      flag: 1,
      isNoMoredata: false,
      loadGif,
      loadNextPage: false
    }
  },
  computed: {
  },
  components: {
    RankItem,
    HotGameCont,
    GhwIconMore
  },
  watch: {
    // 是否开始加载下一页
    isLoadNextPage (val) {
      if (val && !this.isNoMoredata) {
        this.loadNextPage = true
        this.getMoreInfo()
      }
    },
    // 是否开始调接口数据
    isStartService (val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      this.getDetailList1()
      this.getSmallIconList1()
      this.flag++
    },
    // 游戏详情的路由跳转
    showDesc (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    },
    // 加载更多游戏
    getMoreInfo () {
      switch (this.flag) {
        case 1:
          this.rankItemLocationType = 5
          this.hotItemsLocationType = 6
          this.loadNextPage = false
          this.$emit('isShowLoadGif', false)
          break
        case 2:
          this.rankItemLocationType = 7
          this.hotItemsLocationType = 8
          this.getDetailList2()
          this.getSmallIconList2()
          break
        case 3:
          this.rankItemLocationType = 9
          this.getDetailList3()
          break
        case 4:
          this.loadNextPage = false
          this.$emit('isShowLoadGif', false)
          break
        default: break
      }
      this.flag++
    },
    // 推荐游戏1接口请求数据
    getDetailList1 () {
      const obj = {
        'locationType': this.rankItemLocationType
      }
      getAppList(obj).then(res => {
        if (res.data) {
          this.rankItemArr1 = res.data.appList
        }
        this.$emit('isShowLoadGif', false)
      }, error => {
        console.log(error)
        this.$emit('isShowLoadGif', false)
      })
    },
    // 热门游戏1接口请求数据
    getSmallIconList1 () {
      const obj = {
        'locationType': this.hotItemsLocationType
      }
      getAppList(obj).then(res => {
        if (res.data) {
          this.hotItemsArr1 = res.data.appList
        }
        this.$emit('isShowLoadGif', false)
      }, error => {
        console.log(error)
        this.$emit('isShowLoadGif', false)
      })
    },
    // 推荐游戏2接口请求数据
    getDetailList2 () {
      const obj = {
        'locationType': this.rankItemLocationType
      }
      getAppList(obj).then(res => {
        if (res.data) {
          this.rankItemArr2 = res.data.appList
        }
        this.$emit('isShowLoadGif', false)
        this.loadNextPage = false
      }, error => {
        console.log(error)
        this.loadNextPage = false
        this.$emit('isShowLoadGif', false)
      })
    },
    // 热门游戏1接口请求数据
    getSmallIconList2 () {
      const obj = {
        'locationType': this.hotItemsLocationType
      }
      getAppList(obj).then(res => {
        if (res.data) {
          this.showloadMore = false
          this.hotItemsArr2 = res.data.appList
        }
        this.$emit('isShowLoadGif', false)
      }, error => {
        this.showloadMore = false
        console.log(error)
        this.$emit('isShowLoadGif', false)
      })
    },
    // 推荐游戏3接口请求数据
    getDetailList3 () {
      const obj = {
        'locationType': this.rankItemLocationType
      }
      getAppList(obj).then(res => {
        if (res.data) {
          this.rankItemArr3 = res.data.appList
        }
        this.loadNextPage = false
        this.isNoMoredata = true
        this.$emit('isNoMoreData', this.isNoMoredata)
        this.$emit('isShowLoadGif', false)
      }, error => {
        console.log(error)
        this.loadNextPage = false
        this.isNoMoredata = true
        this.$emit('isNoMoreData', this.isNoMoredata)
        this.$emit('isShowLoadGif', false)
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
