import Vue from 'vue'
import vlogin from './index.vue'
import i18n from '@/i18n'
import store from '@/store'
import Toast from '@/components/GhwToast/index.js'

const LoginConstructor = Vue.extend(vlogin)

let instance, loginBoxQueue
const initInstance = () => {
  instance = new LoginConstructor({
    el: document.createElement('div'),
    i18n,
    store
  })
}

// 移除Dom
const removeDom = event => {
  if (event.target.parentNode && !instance.visible) {
    // 移除dom， 但是不会注销 instance     (instance = null)
    event.target.parentNode.removeChild(event.target)
  }
}

// 可手动调用close
LoginConstructor.prototype.close = function () {
  this.visible = false
  loginBoxQueue = null
}

const showLogin = () => {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible) {
    if (loginBoxQueue) {
      let options = Object.assign({}, loginBoxQueue.options)
      for (let prop of Object.keys(options)) {
        instance[prop] = options[prop]
      }

      instance.callback = (loginObj, isLogin = true) => {
        if (isLogin) {
          Toast({
            message: instance.$t('message.public.loginSucc'),
            iconClass: 'iconfont icon-toast-tick'
          })
          loginBoxQueue.resolve()
        } else {
          Toast({
            message: instance.$t('message.public.loginFailed'),
            iconClass: 'iconfont icon-toast-exclamationmark'
          })
          loginBoxQueue.reject('someError')
        }
      }

      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
        // 避免上一个Login没有正常关闭的污染，移除transitionend的监听
        instance.$el.removeEventListener('transitionend', removeDom)

        // 监听transitionend(过渡后)执行removeDom
        setTimeout(() => {
          instance.$el.addEventListener('transitionend', removeDom)
        }, 0)
      })
    }
  }
}

const LoginBox = function (opts) {
  return new Promise((resolve, reject) => { // eslint-disable-line
    loginBoxQueue = {
      options: opts,
      resolve: resolve,
      reject: reject
    }

    showLogin()
  })
}

export default LoginBox
export {
  LoginBox
}
