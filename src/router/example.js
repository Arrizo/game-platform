import vuexDemo from '@/demo/vuexDemo'
import swiperDemo from '@/demo/swiperDemo'
import iframeWrap from '@/demo/iframeWrap'
import iframeWrapParent from '@/demo/iframeWrapParent'
import webSocket from '@/demo/webSocket'
import ShareDemo from '@/demo/ShareDemo'
import routerLeaveDemo from '@/demo/routerLeaveDemo'
import iframeDemo from '@/demo/iframeDemo'

const routes = [{
  path: '/test/vuex',
  name: 'vuexDemo',
  component: vuexDemo
}, {
  path: '/test/swiper',
  name: 'swiperDemo',
  component: swiperDemo
}, {
  path: '/test/iframe-wrapper',
  name: 'iframeWrap',
  component: iframeWrap
}, {
  path: '/test/iframe-wrapper-parent',
  name: 'iframeWrapParent',
  component: iframeWrapParent
}, {
  path: '/test/webSocket',
  name: 'webSocket',
  component: webSocket
}, {
  path: '/test/shareDemo',
  name: 'ShareDemo',
  component: ShareDemo
}, {
  path: '/test/routerLeaveDemo',
  name: 'routerLeaveDemo',
  component: routerLeaveDemo
},
{
  path: '/test/iframeDemo',
  name: 'iframeDemo',
  component: iframeDemo
}]

export default routes
