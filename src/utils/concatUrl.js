function concatUrl (originUrl, name, value) {
  var newUrl = ''
  var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)')
  var tmp = name + '=' + value
  if (originUrl.match(reg) != null) {
    newUrl = originUrl.replace(eval(reg), tmp)
  } else {
    if (originUrl.match('[\?]')) {
      newUrl = originUrl + '&' + tmp
    } else {
      newUrl = originUrl + '?' + tmp
    }
  }
  return newUrl
}

export default concatUrl
