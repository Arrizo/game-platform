import store from '@/store'
import crossHandler from '@/utils/crossHandler'
import * as constVar from '@/config/const'
import * as postMessageEvent from '@/config/postMessageEvent'

const notifyHandler = pushArr => {
  for (let index in pushArr) {
    const pushObj = pushArr[index]
    const pushType = +pushObj.pushType
    switch (pushType) {
      case constVar.NOTIFICATION_TYPE_OTHER:
        break
      case constVar.NOTIFICATION_TYPE_RED_DOT:
        store.dispatch('showRedDot', pushObj)
        break
      case constVar.NOTIFICATION_TYPE_QRCODE:
        console.log('二维码过期')
        crossHandler(postMessageEvent.INVALID_QRCODE)
        break
      default:
        break
    }
  }
}

export default notifyHandler
