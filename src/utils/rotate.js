export function setRotate90() {
  document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientWidth + 'px'
  document.getElementsByClassName('layout-wrapper')[0].style.width = document.documentElement.clientHeight + 'px'
  // document.body.style.transform = 'rotate(' + 90 + 'deg)'
  document.getElementById('app').style.transform = 'rotate(' + 90 + 'deg)'
}
export function setRotate0() {
  document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'
  document.getElementsByClassName('layout-wrapper')[0].style.width = ''
  // document.body.style.transform = 'rotate(' + 0 + 'deg)'
  document.getElementById('app').style.transform = ''
}

export function setRotate90PC(){
  document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientWidth + 'px'
  document.getElementsByClassName('layout-wrapper')[0].style.width = document.documentElement.clientHeight + 'px'
}

export function setRotate0PC(){
  document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'  
  document.getElementsByClassName('layout-wrapper')[0].style.width = '100%'
}

export function resizePCFrame(){
  // pc上使用clientHeight旋转后获取的高度出现问题,获取的值比实际少17px,可能旋转的时候出现滚动条, 旋转的瞬间firefox可以看见滚动的出现
  console.log('HHHHH: ',document.documentElement.clientHeight)
  console.log('WWWWW: ',document.documentElement.clientWidth)
  console.log('HHHHH: ',window.innerHeight)
  console.log('WWWWW: ',window.innerWidth)  
  // document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'
  // document.getElementsByClassName('layout-wrapper')[0].style.width = document.documentElement.clientWidth + 'px'
  document.getElementsByClassName('layout-wrapper')[0].style.height = window.innerHeight + 'px'
  document.getElementsByClassName('layout-wrapper')[0].style.width = window.innerWidth + 'px'
}

// 判断手机横竖屏状态：
function playingGameRotate() {
  if (window.orientation === 180 || window.orientation === 0) {
    setTimeout(function () {
      setRotate90()
    }, 1000)
  }
  if (window.orientation === 90 || window.orientation === -90) {
    setTimeout(function () {
      setRotate0()
    }, 1000)
  }
}

function defaultRotate() {
  if (window.orientation === 180 || window.orientation === 0) {
    setTimeout(function () {
      document.getElementsByClassName('layout-wrapper')[0].style.width = '100%'
      document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'
    }, 1000)
  }
  if (window.orientation === 90 || window.orientation === -90) {
    setTimeout(function () {
      document.getElementsByClassName('layout-wrapper')[0].style.width = '100%'
      document.getElementsByClassName('layout-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'
    }, 1000)
  }
}

export function addOrientationListener() {
  window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', playingGameRotate, false)
}
export function removeOrientationListener() {
  window.removeEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', playingGameRotate, false)
}

export function addDefaultListener() {
  window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', defaultRotate, false)
}
export function removeDefaultListener() {
  window.removeEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', defaultRotate, false)
}
// export default{
//   setRotate0,
//   setRotate90
// }
