import { WING_DOMAIN } from '@/config/env'

function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + cvalue + '; ' + expires + ";domain=" + WING_DOMAIN + ";path=/"
}

export default setCookie
