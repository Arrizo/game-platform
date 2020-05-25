
import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import { API_PATH } from '../config/env'
/* eslint-able */

// 获取二维码链接
export const getQrCode = (jsonObj) => fetch(API_PATH + '/api/user/client/qrcode', jsonObj, 'GET')

// 获取快捷方式文件下载地址
export const getShortcut = (jsonObj) => fetch(API_PATH + '/api/user/client/shortcut', jsonObj, 'GET')

// 获取我的消息未读的数量
export const getUnreadCount = (jsonObj) => fetch(API_PATH + '/api/user/notif/list', jsonObj, 'GET')
