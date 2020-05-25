/**
 * 动态生成iframe
 * @module src/utils/dynamicIframe.js
 * @desc 动态生成iframe并监听是否链接完毕返回状态
 * @author yanghuiru
 * @date 2018-8-01
 * @example 调用示例
 *    addIframe(iframeSrc, iframeId)
 */
export default function addIframe(iframeSrc, iframeId) {
  var iframe = document.createElement('iframe')
  iframe.src = iframeSrc
  iframe.style = "width:100%;height: 100%;position:relative;overflow:hidden;"
  document.getElementById(iframeId).insertBefore(iframe,document.getElementById(iframeId).children[0])
}
