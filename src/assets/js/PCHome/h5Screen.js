function resizePhone (onoff, num) {
  // 兼容老板电脑
  var minwidth = 300
  var minheight = (minwidth + minwidth * 0.1) / 0.557
  var resize = document.getElementById('jfh5')
  var frame = document.getElementById('frame-main')
  var JFh5 = null
  if (window.innerHeight < minheight) {
    // alert(2)
    let paddingLeft, paddingRight, bgwidth, bgheight, paddingTop, paddingBottom
    paddingLeft = minwidth * 0.05
    paddingRight = minwidth * 0.05
    bgwidth = minwidth + 2 * paddingLeft
    bgheight = bgwidth / 0.557
    paddingTop = 0.06 * bgheight
    paddingBottom = 0.07 * bgheight
    // right = -28 + 0.028 * bgwidth
    JFh5 = {
      'height': (bgheight - paddingTop - paddingBottom) + 'px',
      'width': (bgwidth - 2 * paddingLeft) + 'px',
      'marginLeft': (-bgwidth / 2) + 'px',
      'padding': paddingTop + 'px ' + paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px ',
      'top': 0,
      'bottom': 'auto'
    }
  } else {
    let winHeight, bgheight, paddingTop, paddingBottom, bgwidth, bottom, paddingLeft, paddingRight
    winHeight = window.innerHeight
    bgheight = winHeight - 10
    paddingTop = 0.06 * bgheight
    paddingBottom = 0.07 * bgheight
    bgwidth = 0.557 * bgheight
    bottom = '0px'
    paddingLeft = 0.05 * bgwidth
    paddingRight = 0.05 * bgwidth
    // right = -28 + 0.028 * bgwidth
    JFh5 = {
      'height': (bgheight - paddingTop - paddingBottom) + 'px',
      'width': (bgwidth - 2 * paddingLeft) + 'px',
      'marginLeft': (-bgwidth / 2) + 'px',
      'padding': paddingTop + 'px ' + paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px ',
      'top': 'auto',
      'bottom': bottom + 'px',
      'paddingTop': paddingTop + 'px'
    }
  }
  resize.style.height = JFh5.height
  resize.style.width = JFh5.width
  resize.style.padding = JFh5.padding
  resize.style.top = JFh5.top
  resize.style.bottom = JFh5.bottom
  resize.style.marginLeft = JFh5.marginLeft
  if (onoff) {
    frame.style.height = JFh5.width
    frame.style.width = JFh5.height
  } else {
    frame.style.height = JFh5.height
    frame.style.width = JFh5.width
  }
}

function datatran () {
  var LocString = String(window.document.location.href)
  function getQueryStr () {
    var args = LocString.split('?')
    var retval = []

    if (args[0] === LocString) {
      return retval
    }
    var str = args[1]
    args = str.split('&')
    for (var i = 0; i < args.length; i++) {
      str = args[i]
      var arg = str.split('=')
      for (var j = 0; j < arg.length; j++) {
        retval.push(arg[j])
      }
    }
    return retval
  }
  var arr = getQueryStr()
  var tranDate = document.getElementById('aa')
  for (var i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      tranDate.innerHTML += arr[i]
    } else {
      tranDate.innerHTML += '=' + arr[i] + '<br/>'
    }
  }
}

export {
  resizePhone,
  datatran}
