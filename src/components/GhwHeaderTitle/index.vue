<template>
  <div class="wrap-title-box" id="wrap_title_box">
    <div class="title-background clearfix" id="title_height">
      <i class="go-back-triangle " :class="['back'+iconStyle]" @click="$emit('goBack')">
        <span class="accout-text" v-if="EditText===EditContent">{{$t('message.public.cancel')}}</span>
      </i>
      <i class="title-icon" :class="[iconStyle+'-icon',{'newest':isHasRedDot}]" @click="$emit('hanlderMessage')">
        <span class="accout-text" v-if="showEditSave">{{EditText}}</span>
      </i>
      <h3 class="header-content">{{headerContent}}</h3>
    </div>
    <ghw-warn-pop :isShowWarn="isShowWarn" :warnContent="warnContent" :isChangeContent="isChangeContent" class="location"></ghw-warn-pop>
  </div>
</template>
<script>
/**
* @desc 使用于用户的头部返回信息
* @author chenzechao
 * @date 2018.7.2
* @param {String} headerContent-标题
* @param {Boolean} iconStyle-头部的图标
* @param {Boolean} isHasRedDot-红点
* @param {Boolean} isShowWarn -是否显示提示条
*@param {String} warnContent-提示文本
*@param {Boolean} showEditSave-是否显示编辑文本
*@param {String} EditText-显示文本

* @example 调用实例    <ghw-header-title :headerContent="'Profile'" @goBack="goBack" :iconStyle="'remind'"></ghw-header-title>
*/
import GhwWarnPop from '@/components/GhwWarnPop'
export default {
  name: 'GhwHeaderTitle',
  props: {
    headerContent: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: String,
      default: ''
    },
    isHasRedDot: {
      type: Boolean,
      default: false
    },
    isShowWarn: {
      type: Boolean,
      default: false
    },
    warnContent: {
      type: String,
      default: ''
    },
    isChangeContent: {
      type: Boolean,
      default: false
    },
    showEditSave: {
      type: Boolean,
      default: false
    },
    EditText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      EditContent: this.$t('message.public.save')
    }
  },
  components: {
    GhwWarnPop
  },
  watch: {
  },
  beforeMount: function () {
  },
  // 挂载到实例上调用
  mounted: function () {
  },
  // 数据更新是调用
  beforeUpdate: function () {
  },
  // 重新渲染时调用
  updated: function () {
  },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }
}
</script>
<style lang="scss" scoped>
.wrap-title-box {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 5;
  .title-background {
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-bottom: 0.5px solid #eee;
    background: #ffffff;
  }
}
.location {
  top: -30px;
}
.go-back-triangle {
  width: 20px;
  height: 44px;
  float: left;
  margin-left: 6px;
  position: relative;
  span {
    left: 6px;
    color: #999;
  }
}

.header-content {
  text-align: center;
  font-size: 16px;
  font-family: 'Microsoft YaHei';
  color: #333;
}
.title-icon {
  width: 14px;
  height: 14px;
  float: right;
  margin: 14px 12px 15px 5px;
  position: relative;
  span {
    right: -6px;
    top: -15px;
    color: #1787dd;
  }
}
.accout-text {
  position: absolute;
  width: 36px;
  font-style: normal;
  font-size: 13px;
}
.newest::before {
  right: 12px;
  top: 12px;
}
.delete-icon {
  background: url('../../assets/img/trashIcon.svg') center/100% no-repeat;
}
.remind-icon {
  background: url('../../assets/img/remind.svg') center/100% no-repeat;
}
.back,
.backremind,
.backdelete {
  background: url('../../assets/img/returnNav.svg') center center/40% no-repeat;
}
</style>
