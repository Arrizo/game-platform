<template>
    <div class="main">
      <!--轮播图-->
      <ghw-banner :location="1" />
      <!--列表-->
      <div class="list">
        <!--页中导航栏-->
        <category-title :gameTypeList="gameTypeList" :locationTypeName="locationTypeName"></category-title>
        <!--游戏排行榜-->
        <div class="rankBox">
          <!--热门-->
          <div class="rankList">
            <div class="rank-item" is="rank-item" v-for="(item,index) in gameTypeList" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :appUrl="item.appUrl" :appTags="item.appTags" :appRate="item.appRate" :key="'rankItem'+index" @clickHandle="showDesc(item.appId)" :itemType="'catagory'" :locationTypeName="locationTypeName" :appPopularity="item.appPopularity"> </div>
            <ghw-no-content :isShowNoContent="!showCategoryLoad&&gameTypeList.length===0"></ghw-no-content>
            <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage" :isNoContent="!showCategoryLoad&&gameTypeList.length===0"/>
            <ghw-load-gif :isShowLoadGif="showCategoryLoad"></ghw-load-gif>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import RankItem from '@/containers/Home/components/RankItem'
import GhwBanner from '@/components/GhwBanner'
import { getAppList } from '@/services'
import iconShinyStar from '@/assets/img/star2.png'
import iconGrayStar from '@/assets/img/star.png'
import GhwIconMore from '@/components/GhwIconMore'
import GhwLoadGif from '@/components/GhwLoadGif'
import CategoryTitle from '@/containers/Gamestype/components/CategoryTitle'
import GhwNoContent from '@/components/GhwNoContent'
export default {
  name: 'Gamestype',
  extends: {},
  props: {},
  data () {
    return {
      iconShinyStar,
      iconGrayStar,
      page: 0,
      allLoaded: false,
      pageSize: 10,
      gameTypeList: [],
      locationTypeName: null,
      showCategoryLoad: true,
      isNoMoredata: false,
      loadNextPage: false
    }
  },
  computed: {},
  components: {
    GhwIconMore,
    GhwBanner,
    RankItem,
    GhwLoadGif,
    CategoryTitle,
    GhwNoContent
  },
  watch: {},
  methods: {
    // 跳转到详情页
    showDesc (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    },
    // 获取游戏列表
    setAPPList () {
      this.page++
      const obj = {
        locationType: this.$route.query.typeId,
        page: this.page,
        pageSize: this.pageSize
      }
      getAppList(obj).then(res => {
        this.showCategoryLoad = false
        if (res.data) {
          if (res.data.appList.length === 0 || res.data.appList.length < this.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.appList && res.data.appList.length > 0) {
            this.gameTypeList.push(...res.data.appList)
            this.locationTypeName = res.data.locationTypeName
          }
        }
        this.loadNextPage = false
      },
      error => {
        console.log(error)
        this.showCategoryLoad = false
      })
    },
    // 监听滚动事件
    watchGameStyleScroll () {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (!this.isNoMoredata && !this.showCategoryLoad) {
          this.loadNextPage = true
          this.setAPPList()
        }
      }
    }
  },
  beforeMount () {
  },
  mounted: function () {
    this.setAPPList()
    document.getElementById('innerWrapper').addEventListener('scroll', this.watchGameStyleScroll)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.warp {
  width: 100%;
  // height: 100%;
  background-color: #fffdfd;
  margin-bottom: 50px;
}
.main {
  width: 100%;
  // overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.list {
  position: relative;
  width: 100%;
  min-height: 100px;
}
.rankBox {
  position: relative;
  width: 100%;
  min-height: 180px;
  -webkit-overflow-scrolling: touch;
}
.rankList {
  position: relative;
  width: 100%;
}
.star img {
  width: 11%;
  margin-top: 3px;
}
.rank-item {
  position: relative;
  width: 100%;
  height: 76px;
  padding: 8px 0px;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
// .rank_img {
//   float: left;
//   display: block;
//   margin-left: 3%;
//   width: 18.125%;
//   height: 56px;
// }
// .rank_lf {
//   float: left;
//   position: relative;
//   margin-left: 7px;
//   width: 45%;
//   height: 56px;
// }
// .rank_lf h3 {
//   position: absolute;
//   top: 6px;
//   left: 0px;
//   color: #444444;
//   font-size: 12px;
//   font-weight: bold;
// }
// .rank_lf p {
//   position: absolute;
//   top: 23px;
//   left: 0px;
//   color: #848484;
//   font-size: 9px;
// }
// .rank_rg {
//   float: right;
//   margin-right: 3%;
//   width: 21%;
//   height: 100%;
// }
// .rank_rg a {
//   display: block;
//   width: 100%;
//   height: 26px;
//   margin-top: 16px;
//   font-size: 9px;
//   color: #ffffff;
//   line-height: 26px;
//   text-align: center;
//   background: url("../../assets/img/list_playBtn.png") no-repeat;
//   background-size: 100% 100%;
// }
// .gotop {
//   display: block;
//   width: 11.25%;
//   height: 36px;
//   position: fixed;
//   z-index: 3;
//   text-align: center;
//   cursor: pointer;
//   right: 20px;
//   bottom: 60px;
// }
// .gotop a {
//   display: block;
//   width: 100%;
//   height: 36px;
//   opacity: 1;
//   background: url("../../assets/img/top.png") no-repeat;
//   background-size: 100% 100%;
// }
</style>
