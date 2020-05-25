// import Home from '@/containers/Home'
// import InformationList from '@/containers/Home/InformationList'

const Home = resolve => require(['@/containers/Home'], resolve)
const InformationList = resolve => require(['@/containers/Home/InformationList'], resolve)

const routes = [
  {
    path: '/home/:tab',
    name: 'HomeTab',
    component: Home,
    props: false,
    meta: {
      curIndex: 1,
      pageId: 0,
      pageName: 'Home'
    }
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/navBar1',
    meta: {
      pageId: 0,
      pageName: 'Home'
    }
  },
  // 资讯列表
  {
    path: '/info-list',
    name: 'InformationList',
    component: InformationList,
    meta: {
      pageId: 11,
      pageName: 'InformationList'
    }
  }
]

export default routes
