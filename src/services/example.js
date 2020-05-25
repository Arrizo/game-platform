
import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import { API_PATH } from '../config/env'
/* eslint-able */

export const TEST = (jsonObj) => fetch('api/hotItemsArr', jsonObj, 'GET')
