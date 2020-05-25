<template>
  <div>
    <div v-if="hasLoadingIcon" :class="getIconStyle(userIconSize)" @click.stop="$emit('showPreview',userIcon)">
      <img :src="userIcon">
    </div>
    <div v-else class="border-img">
      <img :src="userIcon" v-if="!uploading" class="">
      <mt-spinner type="fading-circle" color="#00a0e9" class="img-spinner" v-if="uploading"></mt-spinner>
    </div>
  </div>
</template>

<script>
/**
* @desc 使用于用户的头部信息图标
* @author chenzechao
 * @date 2018.5.28
* @param {String} userIcon-用户头像
* @param {String} userIconSize-头像大小
* @param {Boolean} [hasLoadingIcon] -是否有加载效果
* @example 调用实例 <personal-header :userIcon="userObj.iconUrl" :userName="userObj.nickname" :userId="userObj.userId" :linkTo="'MyMessageList'"
:headerMsg===0></personal-header>
*/
export default {
  name: 'HeaderIcon',
  props: {
    userIcon: {
      type: String,
      default: ''
    },
    userIconSize: {
      type: String,
      default: ''
    },
    uploading: {
      type: Boolean,
      default: false
    },
    hasLoadingIcon: {
      type: Boolean,
      default: true
    }
  },
  components: {

  },
  methods: {
    getIconStyle (userIconSize) {
      let iconStyle = 'heads'
      switch (userIconSize) {
        // 个人中心头像
        case 'large':
          iconStyle = 'heads'
          break
        // 聊天用户头像
        case 'small':
          iconStyle = 'player-header'
          break
        // pc端的头像
        case 'normal':
          iconStyle = 'user-icon'
          break
        // 移动端的头像
        case 'middle':
          iconStyle = 'user'
          break
        // 个人中页
        case 'personal-icon':
          iconStyle = 'personal-icon'
          break
      }
      return iconStyle
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-icon {
  width: 75px;
  height: 75px;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  border: 0.5px solid #eeeeee;
  img {
    width: 100%;
  }
}
.heads {
  width: 60px;
  height: 60px;
  float: left;
  margin-left: 10px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    float: left;
    width: 60px;
  }
}
// .user-icon {
//   width: 42px;
//   height: 42px;
//   margin-right: 10px;
//   float: left;
//   border-radius: 21px;
//   overflow: hidden;
//   img {
//     width: 100%;
//   }
// }
.player-header {
  float: right;
  margin-top: 8px;
  margin-left: 8px;
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: 0.5px solid #eee;
}
.player-header img {
  width: 100%;
}
.user-icon {
  width: 42px;
  height: 42px;
  margin-right: 10px;
  float: left;
  border-radius: 21px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
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
.border-img {
  border-radius: 50%;
  overflow: hidden;
  height: 35px;
  width: 35px;
  border: 0.5px solid #eee;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  .mint-spinner-fading-circle {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
