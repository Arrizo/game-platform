import Vue from 'vue'
import vToast from './index.vue'

const ToastConstructor = Vue.extend(vToast)
const toastPool = []

const getAnInstance = () => {
  if (toastPool.length) {
    const instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

// toastPool添加实例
const returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

// 移除Dom
const removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

// 可手动调用close
ToastConstructor.prototype.close = function () {
  this.visible = false
  // 监听transitionend(过渡后)执行removeDom
  this.$el.addEventListener('transitionend', removeDom)

  this.closed = true
  returnAnInstance(this)
}

const Toast = (options = {}) => {
  // 默认3000ms
  const duration = options.duration || 1500

  const instance = getAnInstance()
  instance.closed = false

  // 清除手动调用close时遗留的定时器
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.iconClass = options.iconClass || ''

  // 在body下append
  document.body.appendChild(instance.$el)

  // 在渲染完毕(ready)后执行
  Vue.nextTick(function () {
    instance.visible = true

    // 避免上一个toast的污染，移除transitionend的监听
    instance.$el.removeEventListener('transitionend', removeDom)

    // duration !== -1
    ~duration && (instance.timer = setTimeout(function () {
      if (instance.closed) return
      instance.close()
    }, duration))
  })
  return instance
}

export default Toast
