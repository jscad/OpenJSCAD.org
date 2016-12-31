export function isChrome () {
  return (window.navigator.userAgent.search('Chrome') >= 0)
}

export function isSafari () {
  return /Version\/[\d\.]+.*Safari/.test(window.navigator.userAgent) // FIXME WWW says don't use this
}

export function detectBrowser () {
  if (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i)) {
    return RegExp.$1.toLowerCase()
  } else {
    return 'unknown'
  }
}
