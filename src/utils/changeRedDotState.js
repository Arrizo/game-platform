import setCookie from '@/utils/setCookie'
import getCookie from '@/utils/getCookie'
function changeRedDotState (redDotName,redDotFlag){
  if(getCookie(redDotName)){
  let cookieId = JSON.parse(getCookie(redDotName)).pushId
  let obj = JSON.stringify({pushId: cookieId, hasRead: redDotFlag})
  setCookie(redDotName, obj, 6)
  }
}
export default changeRedDotState