import Qs from 'qs'
import { API_PATH } from '@/config/env'

export const config = {
  method: 'post',
  baseUrl: API_PATH,
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  transformRequest: [
    function (data, headers) {
      // 每个接口都添加v=timestamp，避免浏览器缓存接口数据，以便每次都是请求最新的数据
      data.v = new Date().getTime()
      // console.log(navigator.language.toString().replace(/-/,'_'))
      data.locale = (navigator.language || navigator.userLanguage).toString().replace(/-/, '_')
      return data
    }
  ]
}

export const timeOutList = [1, 3, 10, 30]
