import getCookie from '@/utils/getCookie'
import setCookie from '@/utils/setCookie'
import store from '@/store'

function redDotHandler(redDotObj) {
  let redDotLoca = 'redDotLocation_' + redDotObj.redDotLocation
  let redDotObjFromCookie = JSON.parse(getCookie(redDotLoca))

  if (redDotObjFromCookie) {
    if (redDotObj.pushId > redDotObjFromCookie.pushId) {
      let pushObj = JSON.stringify({ pushId: redDotObj.pushId, hasRead: 'true' })

      setCookie(redDotLoca, pushObj, 6)

      store.dispatch('changeCookieState', {
        cookieName: redDotLoca,
        cookieFlag: true,
        pushTargetType: redDotObj.pushTargetType
      })
    } else if (redDotObj.pushId < redDotObjFromCookie.pushId && redDotObj.pushTargetType === 1) {
      store.dispatch('changeCookieState', {
        cookieName: redDotLoca,
        cookieFlag: true,
        pushTargetType: redDotObj.pushTargetType
      })
    }
  } else {
    let pushObj = JSON.stringify({ pushId: redDotObj.pushId, hasRead: true })

    setCookie(redDotLoca, pushObj, 6)
    store.dispatch('changeCookieState', { cookieName: redDotLoca, cookieFlag: true })
  }
}
export default redDotHandler
