<template>
  <div>
    <!--说明-->
    <!--查看留言-->
    <div class="service-view-box">
      <!--1-->
      <div class="service-item clearfix" :class="{'newest': item.viewStatus}" v-for="(item,index) in serviceViewList" :key="'view'+index" >
        <!-- <div class="service-num">{{index+1}}</div> -->
        <!--最右边-->
        <div class="service-que-btn">
          <div v-if="item.queryStatus===0" class="service-que-tips service-red">{{$t('message.me.ticket.processing')}}</div>
          <div v-else-if="item.queryStatus===2" class="service-que-tips service-green">{{$t('message.me.ticket.completed')}}</div>
          <div v-else-if="item.queryStatus===1" class="service-que-tips service-blue">{{$t('message.me.ticketList.answered')}}</div>
          <ghw-btn :size="'ellipse'" :type="'public'" :inputType="'button'" :inputValue="$t('message.me.ticket.check')" @triggerEvent="showMessageDetail(item.queryId)" class="service-viewBtn" />
        </div>
        <div class="service-que">
          <h5>{{$t('message.me.ticket.ticketType')}}：</h5>
          <span>{{item.ticketTypeName}}</span><br/>
          <h5>{{$t('message.me.ticket.gameName')}}：</h5>
          <span class="service-over">{{item.appName}}</span><br/>
          <h5>{{$t('message.me.ticket.briefIntro')}}：</h5>
          <span class="service-over">{{item.queryContent}}</span><br/>
          <h5> {{$t('message.me.ticket.submitTime')}}：</h5>
          <span>{{getTime(item.occurTime)}}</span>
        </div>
      </div>
      <ghw-load-gif :isShowLoadGif="isShowLoadGif"></ghw-load-gif>
      <ghw-no-content :isShowNoContent="!isShowLoadGif&&serviceViewList.length===0"></ghw-no-content>
      <ghw-icon-more :isNoMoredata="isNoMoredata" :loadNextPage="loadNextPage" :isNoContent="!isShowLoadGif&&serviceViewList.length===0"></ghw-icon-more>
    </div>
  </div>
</template>
<script>
import GhwIconMore from '@/components/GhwIconMore'
import { getQueryList } from '@/services'
import { mapState } from 'vuex'
import GhwBtn from '@/components/GhwBtn'
import GhwNoContent from '@/components/GhwNoContent'
import GhwLoadGif from '@/components/GhwLoadGif'
export default {
  name: 'ServiceView',
  props: {
    isDataRefresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: 0,
      pageSize: 10,
      listNumber: 0,
      serverClass: '',
      isNoMoredata: false,
      loadNextPage: false,
      serviceViewList: [],
      isShowLoadGif: false
    }
  },
  computed: {
    ...mapState({
      userObj: state => state.user.userObj,
      showServiceDiolag: state => state.home.showServiceDiolag,
      isPlaying: state => state.user.isPlaying

    })
  },
  components: {
    GhwIconMore,
    GhwBtn,
    GhwNoContent,
    GhwLoadGif
  },
  watch: {
    isDataRefresh () {
      this.page = 0
      this.serviceViewList = []
      this.setQueryList()
    }
  },
  methods: {
    setQueryList () {
      this.page++
      var obj = {
        userId: this.userObj.userId,
        userToken: this.userObj.h5Token,
        page: this.page,
        pageSize: this.pageSize
      }
      getQueryList(obj).then(res => {
        this.isShowLoadGif = false
        if (res.data) {
          if (res.data.queryList.length === 0 || res.data.queryList.length < this.pageSize) {
            this.isNoMoredata = true
          }
          if (res.data.queryList.length > 0) {
            this.serviceViewList.push(...res.data.queryList)
          }
        }
        this.loadNextPage = false
      }, error => {
        console.log(error)
        this.loadNextPage = false
      })
    },
    getTime (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm')
    },
    loadMoreMessage: function () {
      this.setQueryList()
    },
    showMessageDetail (queryId) {
      if (this.isPlaying) {
        this.$store.dispatch('changeQueryId', queryId)
        setTimeout(() => {
          this.$store.dispatch('showServiceDiolag', true)
        }, 500)
      } else {
        this.$router.push({ name: 'ServiceDialog', query: { 'queryId': queryId } })
      }
    },
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (!this.isNoMoredata && !this.isShowLoadGif) {
          this.loadNextPage = true
          this.setQueryList()
        }
      }
    }
  },

  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    this.setQueryList()
    document.getElementById('innerWrapper').addEventListener('scroll', this.changeNavBoxStatue)
  },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }
}
</script>

<style lang='scss' scoped>
.service-view-box {
  width: 100%;
  margin: 0 auto;
  min-height: 100px;
  background: #f6f6f6;
}
//兼容火狐的hack
@-moz-document url-prefix() {
  .service-view-box {
    min-height: 12rem !important;
  }
}
.service-item {
  min-height: 30px;
  // padding: 0px 3%;
  margin-bottom: 7px;
  color: #565656;
  background: #fff;
  position: relative;
  &.newest::before {
    right: 23px;
    top: 12px;
    z-index: 1;
  }
}
// .service-num {
//   float: left;
//   font-size: 11px;
//   width: 4%;
// }
.service-que {
  position: relative;
  float: left;
  width: 100%;
  min-height: 50px;
  font-size: 13px;
  margin: 14px 0 14px 12px;
  line-height: 16px;
  color: #333;
  line-height: 20px;
  font-family: 'Microsoft YaHei';
}
.service-que h5 {
  display: inline-block;
  // width: 38%;
  color: #999;
  font-family: 'Microsoft YaHei';
  font-size: 13px;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.service-over {
  display: inline-block;
  width: 50%;
  vertical-align: bottom;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.service-que-tips {
  // position: absolute;
  // bottom: 28px;
  // right: 0;
  // width: 22%;
  margin-left: 13px;
  text-align: left;
  font-size: 11px;
  display: inline-block;
}
.service-que-btn {
  height: 40px;
  line-height: 40px;
  border-bottom: 0.5px solid #eeeeee;
  // line-height: 40px;
  // width: 100%;
}
.service-red {
  color: #fb5152;
}
.service-green {
  color: #17ddac;
}
.service-blue {
  color: #00a0e9;
}
.service-viewBtn {
  float: right;
  margin-right: 13px;
}
</style>
