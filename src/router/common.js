
// import Detail from '@/containers/Common/Detail'
// import Search from '@/containers/Common/Search'
// import Information from '@/containers/Common/Information'
// import IframeWrapper from '@/containers/Common/IframeWrapper'
// import Login from '@/containers/Common/IframeWrapper/login'
// import ExternalIframeWrapper from '@/containers/Common/ExternalIframeWrapper'

const Detail = resolve => require(['@/containers/Common/Detail'], resolve)
const Search = resolve => require(['@/containers/Common/Search'], resolve)
const Information = resolve => require(['@/containers/Common/Information'], resolve)
const IframeWrapper = resolve => require(['@/containers/Common/IframeWrapper'], resolve)
const Login = resolve => require(['@/containers/Common/IframeWrapper/login'], resolve)
const ExternalIframeWrapper = resolve => require(['@/containers/Common/ExternalIframeWrapper'], resolve)

const routes = [
  {
    path: '/common/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      hasHeader: false,
      pageId: 3,
      pageName: 'GameDetail'
    }
  },
  {
    path: '/common/search',
    name: 'Search',
    component: Search,
    meta: {
      hasHeader: false,
      pageId: 8,
      pageName: 'Search'
    }
  },
  {
    path: '/common/info',
    name: 'Information',
    component: Information,
    meta: {
      hasHeader: false,
      hasFooter: false,
      pageId: 4,
      pageName: 'InfoDetail'
    }
  },
  {
    path: '/common/link-wrapper',
    name: 'IframeWrapper',
    component: IframeWrapper,
    meta: {
      hasHeader: false,
      hasFooter: false,
      pageId: 5,
      pageName: 'PlayingPage'
    }
  },
  {
    path: '/common/login',
    name: 'Login',
    component: Login,
    meta: {
      hasHeader: false,
      hasFooter: false,
      showLoginHideBtn: false
    }
  },
  {
    path: '/common/ex-wrapper',
    name: 'ExternalIframeWrapper',
    component: ExternalIframeWrapper,
    meta: {
      hasHeader: false,
      hasFooter: false,
      pageId: 6,
      pageName: 'ExternalPage'
    }
  }
]

export default routes
