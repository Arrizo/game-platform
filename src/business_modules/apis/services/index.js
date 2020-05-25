import axios from 'axios'
import * as BrowserUtils from '@/utils/BrowserUtils'

export const analyticsApi = function (url, params, method) {
  params.locale = (navigator.language || navigator.userLanguage).toString().replace(/-/, '_')
  params.locale = BrowserUtils.getLanguage()

  const requestConfig = {
    method,
    url
  }
  if (requestConfig.method === 'GET') {
    requestConfig.params = params
  } else {
    requestConfig.data = params
  }
  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
