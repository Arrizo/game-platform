<template>
  <div>
    <!-- 头部信息 -->
    <!-- 头部信息 -->

    <ghw-header-title :headerContent="$t('message.me.myTicket')" @goBack="goBack"></ghw-header-title>
    <div class="message-list">
      <div class="nav-msg-placeholder">
        <mt-navbar v-model="navBarMsg" :fixed="isNavBarFixed" class="nav-msg-box">
          <div class="fiex-bar">
            <mt-tab-item id="msgNavBar1" class="nav-msg-item">{{$t('message.me.messages.unread')}}</mt-tab-item>
          </div>
          <div class="fiex-bar">
            <mt-tab-item id="msgNavBar2" class="nav-msg-item">{{$t('message.me.messages.read')}}</mt-tab-item>
          </div>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="navBarMsg">
        <!-- 未读信息开始 -->
        <mt-tab-container-item id="msgNavBar1" class="read-list" :class="{'gray-color':showUnreadLoading||unreadMessageList.length===0}">
          <message-item :myMessageList="unreadMessageList" :navBar="navBarMsg" :title="$t('message.me.messages.unread')"></message-item>
          <ghw-load-gif :isShowLoadGif="showUnreadLoading"></ghw-load-gif>
          <ghw-no-content :isShowNoContent="!showUnreadLoading&&unreadMessageList.length===0"></ghw-no-content>
           <ghw-icon-more :isNoMoredata="unreadNoMoreData" :loadNextPage="loadUnreadNextPage" :isNoContent="!showUnreadLoading&&unreadMessageList.length===0"></ghw-icon-more>
        </mt-tab-container-item>
        <!-- 未读信息结束 -->
        <!-- 已读信息 开始 -->
        <mt-tab-container-item id="msgNavBar2" class="read-list" :class="{'gray-color':showReadLoading||readMessageList.length===0}">
          <message-item :myMessageList="readMessageList" :navBar="navBarMsg" :title="$t('message.me.messages.read')" :showRedColor='true'></message-item>
          <ghw-load-gif :isShowLoadGif="showReadLoading"></ghw-load-gif>
          <ghw-no-content :isShowNoContent="!showReadLoading&&readMessageList.length===0"></ghw-no-content>
          <ghw-icon-more :isNoMoredata="readNoMoreData" :loadNextPage="loadReadNextPage" :isNoContent="!showReadLoading&&readMessageList.length===0"></ghw-icon-more>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import FileNews from '@/assets/img/message/icon-msg-new.svg'
import FileUnread from '@/assets/img/message/icon-msg-unread.svg'
import FileRead from '@/assets/img/message/icon-msg-read.svg'
import GhwIconMore from '@/components/GhwIconMore'
import { mapState } from 'vuex'
import { getMyMessageList } from '@/services'
import CookieUtil from '@/utils/CookieUtil'
import GhwHeaderTitle from '@/components/GhwHeaderTitle'
import GhwNoContent from '@/components/GhwNoContent'
import GhwLoadGif from '@/components/GhwLoadGif'
import MessageItem from '@/containers/PersonalCenter/components/MessageItem'
export default {
  name: 'myinformatio',
  extends: {},
  props: {},
  data () {
    return {
      CookieUtil,
      FileNews,
      FileUnread,
      FileRead,
      isNoMoredata: false,
      loadNextPage: false,
      unreadMessageList: [],
      readMessageList: [],
      readPage: 0,
      unreadPage: 0,
      pageSize: 10,
      isShowLoadGif: true,
      isNavBarFixed: false,
      navBarMsg: this.$route.params.tab || this.$route.query.tab || 'msgNavBar1',
      // 是否加载下一页
      loadUnreadNextPage: false,
      loadReadNextPage: false,
      // 是否显示暂时无更多数据
      unreadNoMoreData: false,
      readNoMoreData: false,
      // 是否显示鲸鱼
      showUnreadLoading: true,
      showReadLoading: true,
      scrollTopNavBar1: 0,
      scrollTopNavBar2: 0
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj
    })
  },
  components: {
    GhwIconMore,
    GhwHeaderTitle,
    GhwNoContent,
    GhwLoadGif,
    MessageItem
  },
  watch: {
    // navBar (newVal, oldVal) {
    //   var self = this
    //   // this.focusTab()
    //   var ele = document.getElementById('innerWrapper')
    //   var scrollTop = ele.pageYOffset || ele.scrollTop
    //   if (self.isNavBarFixed) {
    //     switch (oldVal) {
    //       case 'msgNavBar1':
    //         self.scrollTopNavBar1 = scrollTop
    //         break
    //       case 'msgNavBar2':
    //         self.scrollTopNavBar2 = scrollTop
    //         break
    //     }
    //     switch (newVal) {
    //       case 'msgNavBar1':
    //         // 添加延时操作，防止列表渲染未完成就开始滚动
    //         setTimeout(
    //           function () {
    //             try {
    //               ele.offsetTop = self.scrollTopNavBar1
    //             } catch (error) {
    //               ele.scrollTop = self.scrollTopNavBar1
    //             }
    //           }, 10
    //         )
    //         break
    //       case 'msgNavBar2':
    //         // 添加延时操作，防止列表渲染未完成就开始滚动
    //         setTimeout(
    //           function () {
    //             try {
    //               ele.offsetTop = self.scrollTopNavBar2
    //             } catch (error) {
    //               ele.scrollTop = self.scrollTopNavBar2
    //             }
    //           }, 10
    //         )
    //         break
    //     }
    //   }
    // }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'PersonalCenter' })
    },
    setUnareadMessageList () {
      this.unreadPage++
      var obj = {
        userId: CookieUtil.getInstance().getSdkUserIdFromCookie(),
        userToken: CookieUtil.getInstance().getDecryptH5TokenFromCookie(),
        page: this.unreadPage,
        pageSize: this.pageSize,
        notifStatus: 1 // 1未读
      }
      getMyMessageList(obj).then(res => {
        this.showUnreadLoading = false
        if (res.data) {
          if (res.data.notifList.length === 0 || res.data.notifList.length < this.pageSize) {
            this.unreadNoMoreData = true
          }
          if (res.data.notifList.length > 0) {
            this.unreadMessageList.push(...res.data.notifList)
          }
        }
        this.loadUnreadNextPage = false
      },
      error => {
        console.log(error)
        this.loadUnreadNextPage = false
      })
    },
    setReadMessageList () {
      this.readPage++
      var obj = {
        userId: CookieUtil.getInstance().getSdkUserIdFromCookie(),
        userToken: CookieUtil.getInstance().getDecryptH5TokenFromCookie(),
        page: this.readPage,
        pageSize: this.pageSize,
        notifStatus: 0 // 0已读
      }
      getMyMessageList(obj).then(res => {
        this.showReadLoading = false
        if (res.data) {
          if (res.data.notifList.length === 0 || res.data.notifList.length < this.pageSize) {
            this.readNoMoreData = true
          }
          if (res.data.notifList.length > 0) {
            this.readMessageList.push(...res.data.notifList)
          }
        }
        this.loadReadNextPage = false
      },
      error => {
        console.log(error)
        this.loadReadNextPage = false
      })
    },
    getTime (time) {
      return this.$moment(new Date(parseInt(time))).format('YYYY-MM-DD')
    },
    // 监听滚动事件
    changeNavBoxStatue (ev) {
      var ele = document.getElementById('innerWrapper')
      let scrollTop = ele.pageYOffset || ele.scrollTop
      this.isNavBarFixed = true
      // 当滚动到底部自动加载下一页
      if (ele.scrollHeight === ele.clientHeight + scrollTop) {
        if (this.navBarMsg === 'msgNavBar1' && !this.unreadNoMoreData && !this.showUnreadLoading) {
          this.loadUnreadNextPage = true
          this.setUnareadMessageList()
        }
        if (this.navBarMsg === 'msgNavBar2' && !this.readNoMoreData && !this.showReadLoading) {
          this.loadReadNextPage = true
          this.setReadMessageList()
        }
      }
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
    this.setUnareadMessageList()
    this.setReadMessageList()
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

<style lang="scss" scoped>
.message-list {
  width: 100%;
  margin-top: 51px;
  background-color: #fff;
}
/*一级导航栏*/
.nav-msg-box {
  position: fixed;
  width: 100%;
  height: 42px;
  border-bottom: 0.5px solid rgba(241, 241, 241, 1);
  border-top: 7px solid #f6f6f6;
  top: 44px;
}
.nav-msg-placeholder {
  width: 100%;
  height: 35px;
}
.fiex-bar {
  position: relative;
  flex: 1;
  top: -5px;
}
.nav-msg-box .nav-msg-item {
  height: 42px;
  text-align: center;
  line-height: 42px;
  color: rgba(51, 51, 51, 1);
  .mint-tab-item-label {
    font-size: 13px;
    color: rgba(51, 51, 51, 1);
    margin-top: -4px;
    line-height: 0.2px !important;
  }
}
.nav-msg-box .nav-msg-item.is-selected {
  font-size: 16px;
  border-bottom: none !important;
  color: rgba(23, 135, 221, 1);
  .mint-tab-item-label {
    color: rgba(23, 135, 221, 1);
  }
}
.nav-msg-box .nav-msg-item.is-selected::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  margin: auto;
  background: rgba(23, 135, 221, 1);
  margin-top: 8px;
}
.mint-navbar.is-fixed {
  top: 44px;
  // box-shadow: 0 2px 5px #ebebeb;
}
.gray-color {
  background-color: rgba(246, 246, 246, 1);
}
</style>
