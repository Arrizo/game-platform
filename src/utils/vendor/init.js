import { fbParam } from '@/config/env'

export function initFacebook (callback) {
  // const FB = window.FB
  if (window.FB) {
    window.FB.init({
      appId: fbParam.appId,
      cookie: true,
      xfbml: true,
      version: fbParam.apiVer
    })
    if (callback) callback()
  }
}
