<template>
  <div>
    <div class="warp">
      <div class="main gary">
        <div class="searchBox">
          <div class="search-input">
            <input type="text" ref="searchInput" id="search-input" :placeholder="$t('message.public.inputAppName')" v-model="title">
            <a class="icon">
              <img :src="iconSearch">
            </a>
            <img :src="iconClear" class="clear-search" v-if="title.length>0" @click="title=''">
          </div>
          <a @click="cancelSearch" class="cancel">{{$t("message.public.cancel")}}</a>
        </div>
        <!--搜索前-->
        <div class="search-before" id="search-before" v-show="!isSearch">
          <div class="search-title">{{$t("message.public.hotSearch")}}</div>
          <div class="rankList">
            <a v-for="(item,index) in hotAppList" :key="'item'+index" @click="goAppDetail(item.appId)" class="search-name">
              <span>{{item.appName}}</span>
            </a>
          </div>
        </div>
        <!--搜索后-->
        <div class="search-after" id="search-after" v-show="isSearch">
          <div class="search-title">
            <span id="search-id">{{$t('message.public.searchResult',{string:keyWord})}}</span>
          </div>
          <mt-loadmore ref="loadmore">
            <div class="rank-item" is="rank-item" v-for="(item,index) in appSearchList" :appId="item.appId" :appIconUrl="item.appIconUrl" :appName="item.appName" :briefIntro="item.briefIntro" :appUrl="item.appUrl" :appTags="item.appTags" :key="'rankItem'+index" :itemType="'home'" @clickHandle="showDesc(item.appId)"> </div>
          </mt-loadmore>
          <!--更多-->
          <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage" :isNoContent="appSearchList.length===0" :isShowBottomText="appSearchList.length!==0"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 搜索
* @module @/components/Search
* @desc 搜索
* @author yang huiru
* @date 2018.6.01
* @example 调用示例
* <search></search>
*/
import iconSearch from '@/assets/img/search2.png'
import { getHotAppList, getAppSearchList } from '@/services'
import GhwIconMore from '@/components/GhwIconMore'
import RankItem from '@/containers/Home/components/RankItem'
import iconClear from '@/assets/img/clear-search.png'
// import _ from 'lodash'
// 节流函数
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'Search',
  extends: {},
  props: {},
  data () {
    return {
      page: 1,
      pageSize: 10,
      keyWord: '',
      isSearch: false,
      isLoadMoreShow: true,
      title: '',
      iconSearch,
      hotAppList: [],
      appSearchList: [],
      iconClear,
      isNoMoredata: false,
      loadNextPage: false
    }
  },
  computed: {
  },
  components: {
    GhwIconMore,
    RankItem
  },
  watch: {
    title () {
      this.page = 1
      delay(() => {
        this.fetchData()
        this.isNoMoredata = false
      }, 400)
    }
  },
  methods: {
    // 请求搜索内容
    fetchData () {
      var word = this.$refs.searchInput.value
      if (word === '') {
        this.isSearch = false
        return
      }
      word = word.replace(/'/g, '') // 去除单引号
      this.keyWord = word
      this.isSearch = true
      const obj = {
        page: this.page,
        pageSize: this.pageSize,
        appName: word,
        v: new Date().getTime()
      }
      this.appSearchList = []
      getAppSearchList(obj).then(res => {
        if (res.data) {
          // 没有数据时或没更多数据时隐藏load按钮
          if (res.data.appList.length === 0 || res.data.appList.length < this.pageSize) {
            this.isNoMoredata = true
          }
          this.appSearchList = res.data.appList
        }
      }, error => {
        console.log(error)
      })
    },
    // 加载更多
    loadMore () {
      this.page++
      const obj = {
        page: this.page,
        pageSize: this.pageSize,
        appName: this.keyWord,
        v: new Date().getTime()
      }
      getAppSearchList(obj).then(res => {
        this.loadNextPage = false
        if (res.data) {
          // 没有数据时或没更多数据时隐藏load按钮
          if (res.data.appList.length === 0 || res.data.appList.length < this.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.appList.length > 0) {
            this.appSearchList.push(...res.data.appList) // 结构并拼接到原数组中
          }
        }
      }, error => {
        console.log(error)
      })
    },
    // 监听滚动事件
    handleScroll (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (!this.isNoMoredata) {
          this.loadNextPage = true
          this.loadMore()
        }
      }
    },
    // 显示热门搜索
    setHotAppList () {
      const obj = {
      }
      getHotAppList(obj).then(res => {
        if (res.data &&
          res.data.appList &&
          Object.prototype.toString.call(res.data.appList) === '[object Array]' &&
          res.data.appList.length > 0) {
          this.hotAppList = res.data.appList
        }
      }, error => {
        console.log(error)
      })
    },
    // 取消搜索
    cancelSearch () {
      this.isSearch = false
      this.$router.go(-1)
      // this.title = ''
      // this.$refs.s_input.value = '' //不能使用这种方式清空，否则需要点两次，具体原因未知
    },
    // 跳转到热门搜索详细信息
    goAppDetail (applicationId) {
      this.$router.push({ path: '/common/detail', query: { appId: applicationId } })
    },
    // 跳转搜索内容
    showDesc (id) {
      this.$router.push({ name: 'Detail', query: { appId: id } })
    }
  },
  beforeMount () { },
  mounted () {
    this.setHotAppList()
    document.getElementById('innerWrapper').addEventListener('scroll', this.handleScroll)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () {
    document.getElementById('innerWrapper').removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
.clear-search {
  position: absolute;
  right: 10px;
  top: 6px;
  width: 12px;
}
.gary {
  background-color: #efeff4;
}
.rank-lf-tag {
  // position: absolute;
  bottom: 0;
  left: 0;
}
/*搜索页面*/
.searchBox {
  width: 100%;
  padding: 3% 0px;
}
.search-input {
  position: relative;
  width: 80%;
  height: 26px;
  margin-left: 3%;
  margin-right: 1%;
  display: inline-block;
}
.search-input input {
  width: 100%;
  height: 26px;
  line-height: 24px;
  font-size: 12px;
  text-indent: 10%;
  background-color: #ffffff;
  border-radius: 1px;
  -webkit-appearance: none;
}
.search-input .icon {
  position: absolute;
  top: 7px;
  left: 5px;
  width: 4.655%;
}
.cancel {
  display: inline-block;
  color: #1787dd;
  font-size: 14px;
  width: 40px;
  text-align: center;
  vertical-align: middle;
}
.search-before,
.search-after {
  position: relative;
  width: 100%;
  min-height: 100px;
}
.search-title {
  color: #1787dd;
  line-height: 20px;
  text-indent: 3%;
  font-size: 13px;
}
.search-name {
  display: block;
  width: 94%;
  padding: 12px 3%;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #444444;
  font-size: 11px;
  line-height: 16px;
}

/*游戏排行榜*/
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
.rank-item {
  // position: relative;
  width: 100%;
  height: 70px;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.rank-img {
  float: left;
  display: block;
  margin-left: 3%;
  width: 18.125%;
  height: 55.6px;
}
.rank-lf {
  float: left;
  // position: relative;
  margin-left: 7px;
  width: 45%;
  height: 55.6px;
  // margin-top: 6px;
}
.rank-lf h3 {
  // position: absolute;
  // top: 6px;
  // left: 0;
  color: #444444;
  font-size: 12px;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // margin-top: 0!important;
}
.rank-lf p {
  // position: absolute;
  top: 23px;
  left: 0;
  color: #848484;
  font-size: 9px;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rank-rg {
  float: right;
  margin-right: 3%;
  width: 21%;
  height: 100%;
}
.rank-rg a {
  display: block;
  width: 100%;
  height: 26px;
  margin-top: 16.5px;
  font-size: 9px;
  color: #ffffff;
  line-height: 24px;
  text-align: center;
  background: url("../../../assets/img/list_playBtn.png") no-repeat;
  background-size: 100% 100%;
}
// @media screen and (min-width : 320px) and (max-width : 640px){
//    .search-input {
//      margin-left: 16px;
// }
// .search-title {
//   margin-left: 8px;
// }
// .cancel{
//   width: 30px;
//   display: inline-block;
// }
// }
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .search-input {
    margin-left: 15px;
    margin-right: 10px;
  }
  .search-title {
    color: #1787dd;
    text-indent: 30px;
  }
  .cancel {
    width: 30px;
    display: inline-block;
  }
}
</style>
