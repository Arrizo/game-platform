import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import { API_PATH } from '../config/env'
/* eslint-able */

// H5平台获取登录方式
export const getLoginWay = (jsonObj) => fetch(API_PATH + '/api/user/login/loginway', jsonObj, 'GET')

// H5平台登录
export const login = (jsonObj) => fetch(API_PATH + '/api/user/login/h5', jsonObj, 'GET')

// H5平台登出
export const logout = (jsonObj) => fetch(API_PATH + '/api/user/logout/h5', jsonObj, 'GET')

// H5平台查询个人资料
export const getAccount = (jsonObj) => fetch(API_PATH + '/api/user/profile/detail', jsonObj, 'GET')
// H5平台修改个人资料
export const editAccount = (jsonObj) => fetch(API_PATH + '/api/user/profile/update', jsonObj, 'GET')
// H5平台个人资料上传附件
export const uploadImg = (jsonObj) => fetch(API_PATH + '/api/user/client/upload', jsonObj, 'POST', true)
// 查询留言列表
export const getQueryList = (jsonObj) => fetch(API_PATH + '/api/user/query/list', jsonObj, 'GET')
// 查询游戏列表
export const getGameNameList = (jsonObj) => fetch(API_PATH + '/api/user/query/applist', jsonObj, 'GET')
// 查询问题类别
export const getTikeTypeList = (jsonObj) => fetch(API_PATH + '/api/user/query/tickettypelist', jsonObj, 'GET')
// 添加留言
export const addMessage = (jsonObj) => fetch(API_PATH + '/api/user/query/add', jsonObj, 'GET')
// 留言详情
export const getMessageDetail = (jsonObj) => fetch(API_PATH + '/api/user/query/detail', jsonObj, 'GET')
// 追问问题
export const addMoreQuery = (jsonObj) => fetch(API_PATH + '/api/user/query/morequery', jsonObj, 'GET')
// 及时评分
export const subInstantRate = (jsonObj) => fetch(API_PATH + '/api/user/query/instantRate', jsonObj, 'GET')
