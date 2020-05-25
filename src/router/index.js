import Vue from 'vue'
import Router from 'vue-router'
import home from '@/router/home'
import miniGame from '@/router/miniGame'
import personalCenter from '@/router/personalCenter'
import common from '@/router/common'
// import example from '@/router/example'
import Layout from '@/containers/Layout'
import error from '@/router/error'
import ExternalIframeWrapper from '@/containers/Common/ExternalIframeWrapper'

Vue.use(Router)

const routes = [{
  path: '/layout',
  component: Layout,
  children: [
    // “首页”模块及其子页面（home）
    ...home,
    // “小游戏”模块及其子页面（miniGame）
    ...miniGame,
    // “个人中心”模块及其子页面（personalCenter）
    ...personalCenter,
    // 公共页面（common）
    ...common
  ]
},
  // 例子路由
  // ...example,
  // 错误提示页面
...error,
{
  name: 'ExternalIframeWrapper',
  path: '/ex-link-wrapper',
  component: ExternalIframeWrapper
},
{
  path: '/*',
  redirect: '/home/navBar1'
}
]

let router = new Router({
  // mode: 'history',
  routes
})

export default router
