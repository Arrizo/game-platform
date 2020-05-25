<template>
  <transition name="toast">
    <div class="toast-wrapper" v-show="visible">
      <i class="toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <p class="toast-text" :style="{ 'padding-top': iconClass  ? '0' : '10px' }">{{ message }}</p>
    </div>
  </transition>
</template>

<script type="text/babel">
export default {
  props: {
    message: String,
    iconClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss">
.toast-wrapper {
  position: fixed;
  top: calc(50% - 60px);
  left: calc(50% - 60px);
  width: 120px;
  height: 120px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  // transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1005;
  flex-direction: column;
  .toast-text {
    font-size: 13px;
    color: #fff;
    line-height: 18px;
    width: calc(100% - 26px);
    text-align: center;
  }
  .toast-icon {
    color: #fff;
  }
}

.icon-toast-exclamationmark {
  margin-top: -4px;
  padding-bottom: 7px;
  font-size: 42px!important;
}
.icon-toast-tick {
  margin-top: -8px;
  padding-bottom: 9px;
  font-size: 36.2px!important;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
