<template>
  <!--头部信息-->
  <div class="header">
    <div class="user-cont">
      <!--用户头像-->
      <!-- <a @click="showLoginPopup()"> -->
        <header-icon :userIcon="userObj.iconUrl" :userIconSize="'middle'" @showPreview="showLoginPopup"/>
      <!-- </a> -->
    </div>
    <div class="logo-cont">
      <!--公司logo-->
      <a class="logo" @click="refreshAgain">
        <img :src="iconLogo">
        <em></em>
      </a>
    </div>
    <div class="search-cont">
      <!--放大镜 切换语言-->
      <router-link :to="{name:'Search'}" class="search">
        <img :src="iconSearch">
      </router-link>
    </div>
  </div>
</template>
<script>
/**
* 头部搜索栏
* @module @/components/GhwHeader
* @desc 头部搜索栏
* @author yang huiru
* @date 2018.5.31
* @example 调用示例
* <ghw-header></ghw-header>
*/
import iconUser from '@/assets/img/default_icon3.png'
import iconSearch from '@/assets/img/search.png'
import iconLogo from '@/assets/img/logo.png'
import { mapState } from 'vuex'
import HeaderIcon from '@/containers/PersonalCenter/components/PersonalHeader/components/HeaderIcon'
export default {
  name: 'GhwHeader',
  extends: {},
  data () {
    return {
      iconUser,
      iconSearch,
      iconLogo
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj
    })
  },
  components: {
    HeaderIcon
  },
  watch: {
    isLogin (newVal) {
      if (newVal) {
      }
    }
  },
  methods: {
    // 点击头像路由跳转
    showLoginPopup () {
      if (this.isLogin) {
        this.$router.push({ name: 'PersonalCenter' })
      } else {
        this.$loginBox().then().catch(err => console.log(err))
      }
    },
    // 点击logo重新加载iframe
    refreshAgain () {
      window.location.reload()
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
<style lang="scss" scope>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 33px;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 2;
  display: inline-flex;
  img {
    display: inline-block;
    width: 100%;
  }
}
.user-cont {
  flex: 1;
  .user {
    float: left;
    width: 28px;
    height: 28px;
    margin-top: 2.5px;
    margin-left: 9px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.search-cont {
  flex: 1;
  .search {
    float: right;
    width: 17px;
    height: 18px;
    margin-top: 7.5px;
    margin-right: 10px;
  }
}
.logo-cont {
  flex: 1;
  text-align: center;
  .logo {
    height: 100%;
    img {
      width: 28px;
      vertical-align: middle;
    }
    em {
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
