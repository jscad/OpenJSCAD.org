export function isChrome () {
  return (window.navigator.userAgent.search('Chrome') >= 0)
}

export function detectBrowser () {
  if (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i)) {
    return RegExp.$1.toLowerCase()
  } else {
    return 'unknown'
  }
}
