// import QrcodeUnused from '@/containers/Common/Error/QrcodeUnused'
// import ServerError from '@/containers/Common/Error/ServerError'
// import NotFound from '@/containers/Common/Error/NotFound'

const QrcodeUnused = resolve => require(['@/containers/Common/Error/QrcodeUnused'], resolve)
const ServerError = resolve => require(['@/containers/Common/Error/ServerError'], resolve)
const NotFound = resolve => require(['@/containers/Common/Error/NotFound'], resolve)

const route = [
  {
    path: '/qrcode-out-of-date',
    name: 'QrcodeUnused',
    component: QrcodeUnused,
    meta: {
      pageId: 7,
      pageName: 'QrcodeUnused'
    }
  },
  {
    path: '/server-error',
    name: 'ServerError',
    component: ServerError,
    meta: {
      pageId: 9,
      pageName: 'ServerError'
    }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
    meta: {
      pageId: 10,
      pageName: 'NotFound'
    }
  }
]

export default route
