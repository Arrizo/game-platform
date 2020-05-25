export default function isNull (val) {
  if (val === null || val === undefined) {
    // "",null,undefined
    return true
  }

  // String
  if (typeof val === 'string') {
    if (val === '') {
      // "",null,undefined
      return true
    }
    if (!val) {
      // "",null,undefined,NaN
      return true
    }
    if (!trim(val)) {
      // "",null,undefined
      return true
    }
  }

  // Array
  if (Array.isArray(val)) {
    if (val.length === 0) {
      // "",[]
      return true
    }
  }

  // Object {}
  if (isEmptyObject(val)) {
    // 普通对象使用 for...in 判断，有 key 即为 false
    return true
  }
}

function isEmptyObject (obj) {
  let name
  for (name in obj) {
    return false
  }
  return true
}

function trim (val) {
  // 从空格开始（至少一个空格），中间任意个字符，从空格结束（至少一个空格）
  return val.toString().replace(/^\s+(.*?)\s+$/, '$1')
}
