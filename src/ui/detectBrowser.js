function isChrome () {
  return (window.navigator.userAgent.search('Chrome') >= 0)
}

function detectBrowser () {
  if (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i)) {
    return RegExp.$1.toLowerCase()
  } else {
    return 'unknown'
  }
}

module.exports = {
  isChrome,
  detectBrowser
}
