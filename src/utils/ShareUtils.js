import isNull from './filters/isNull'
import * as BrowserUtils from '@/utils/BrowserUtils'
import * as UserLogin from '@/utils/vendor/init'
import { fbParam } from '@/config/env'

export default function GHWShare(platform, url) {
  isNull(url) ? (url = 'https://www.chipsgames.com') : url
  switch (platform) {
    case 'FB':
      share2FB(url)
      break
    case 'FBM':
      share2FBM(url)
      break
    case 'TW':
      share2TW(url)
      break
    case 'GGP':
      share2GGP(url)
      break
    case 'LI':
      share2LinkedIn(url)
      break
  }
}

/**
 * facebook 网页分享
 * @module src/utils/ShareUtils.js
 * @desc facebook 网页分享
 * @author Dicky_L
 * @date 2018-7-26
 * @example 调用示例
 *    share2FBWeb(url)
 */
function share2FB(url) {
  UserLogin.initFacebook(function() {
    FB.ui(
      {
        method: 'share',
        href: url
      },
      // callback
      function(response) {
        console.log('fb callback: ', response)
      }
    )
  })
}

/**
 * facebook message 分享
 * @module src/utils/ShareUtils.js
 * @desc facebook message 分享
 * @author Dicky_L
 * @date 2018-7-26
 * @example 调用示例
 *    share2FBM(url)
 */
function share2FBM(url) {
  UserLogin.initFacebook(function() {
    if (BrowserUtils.isMobile()) {
      url = 'fb-messenger://share?link=' + encodeURIComponent(url) + '&app_id=' + encodeURIComponent(fbParam.appId)
      window.open(url)
    } else {
      FB.ui(
        {
          method: 'send',
          link: url
        },
        // callback
        function(response) {
          console.log('fbm callback: ', response)
        }
      )
    }
  })
}

/**
 * G+ 分享
 * @module src/utils/ShareUtils.js
 * @desc G+ 分享
 * @author Dicky_L
 * @date 2018-7-26
 * @example 调用示例
 *    share2GPlus(url)
 */
function share2GGP(url) {
  url = '//plus.google.com/share?url=' + encodeURIComponent(url)
  var result = window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
}

/**
 * G+ 分享
 * @module src/utils/ShareUtils.js
 * @desc G+ 分享
 * @author Dicky_L
 * @date 2018-7-26
 * @example 调用示例
 *    shareOnTwitter(url)
 */
function share2TW(url) {
  url = '//twitter.com/intent/tweet?url=' + url
  window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  return false
}

/**
 * linkedin 分享
 * @module src/utils/ShareUtils.js
 * @desc G+ 分享
 * @author Dicky_L
 * @date 2018-7-26
 * @example 调用示例
 *    shareOnTwitter(url)
 */
function share2LinkedIn(url) {
  url = '//www.linkedin.com/shareArticle?mini=true&url=' + url
  window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
  return false
}
