import Fingerprint2 from 'fingerprintjs2'
import StoreUtil from '@/utils/StoreUtil'
import { CLIENT_ID } from '@/config/const'

export function creatClientId() {
  // 初始化clientId
  // 保存到本地缓存
  if (window.localStorage) {
    if (!StoreUtil.getInstance().getItemFromLSCookie(CLIENT_ID)) {
      new Fingerprint2().get(function(result) {
        StoreUtil.getInstance().setItemToLSCookie(CLIENT_ID, result)
      })
    }
  }
}
