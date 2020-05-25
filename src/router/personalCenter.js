// import PersonalCenter from '@/containers/PersonalCenter'
// import MyMessage from '@/containers/PersonalCenter/MyMessage'
// import MessageDetails from '@/containers/PersonalCenter/MessageDetails'
// import BindAccount from '@/containers/PersonalCenter/BindAccount'
// import MessageService from '@/containers/PersonalCenter/MessageService'
// import ServiceMain from '@/containers/PersonalCenter/MessageService/ServiceMain'
// import ServiceDialog from '@/containers/PersonalCenter/MessageService/ServiceDialog'
// import PersonalLayout from '@/containers/PersonalCenter/components/PersonalLayout'

const PersonalCenter = resolve => require(['@/containers/PersonalCenter'], resolve)
const MyMessage = resolve => require(['@/containers/PersonalCenter/MyMessage'], resolve)
const MessageDetails = resolve => require(['@/containers/PersonalCenter/MessageDetails'], resolve)
const BindAccount = resolve => require(['@/containers/PersonalCenter/BindAccount'], resolve)
const MessageService = resolve => require(['@/containers/PersonalCenter/MessageService'], resolve)
const ServiceMain = resolve => require(['@/containers/PersonalCenter/MessageService/ServiceMain'], resolve)
const ServiceDialog = resolve => require(['@/containers/PersonalCenter/MessageService/ServiceDialog'], resolve)
const PersonalLayout = resolve => require(['@/containers/PersonalCenter/components/PersonalLayout'], resolve)

const routes = [
  // 个人中心
  {
    path: '/personal',
    name: 'PersonalCenter',
    component: PersonalCenter,
    meta: {
      hasHeader: false,
      curIndex: 3,
      pageId: 2,
      pageName: 'PersonalCenter'
    }
  },
  {
    path: '/personal-layout',
    name: 'personalLayout',
    component: PersonalLayout,
    children: [
      // 个人中心-我的信息列表
      {
        path: '/personal/messagelist',
        name: 'MyMessageList',
        component: MyMessage,
        meta: {
          hasHeader: false,
          pageId: 15,
          pageName: 'MessageList'
        }
      },
      // 个人中心-消息详情
      {
        path: '/personal/messagedetail',
        name: 'MessageDetail',
        component: MessageDetails,
        meta: {
          hasHeader: false,
          pageId: 16,
          pageName: 'MessageDetail'
        }
      },
      // 个人中心-用户信息
      {
        path: '/personal/bind-account',
        name: 'BindAccount',
        component: BindAccount,
        meta: {
          hasHeader: false,
          pageId: 17,
          pageName: 'BindAccount'
        }
      },
      // 留言系统
      {
        path: '/personal/message-service',
        name: 'MessageService',
        component: MessageService,
        meta: {
          hasHeader: false,
          pageId: 18,
          pageName: 'MessageService'
        }
      },
      // 个人中心-客服-首页
      {
        path: '/personal/service-main',
        name: 'ServiceMain',
        component: ServiceMain,
        meta: {
          hasHeader: false,
          pageId: 19,
          pageName: 'ServiceHome'
        }
      },
      // 个人中心-客服-添加留言
      {
        path: 'personal/service-dialog',
        name: 'ServiceDialog',
        component: ServiceDialog,
        meta: {
          hasHeader: false,
          hasFooter: false,
          pageName: 'ServiceDialog',
          pageId: 20
        }
      }
    ]

  }

]

export default routes
