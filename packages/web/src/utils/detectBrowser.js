const isChrome = () => (window.navigator.userAgent.search('Chrome') >= 0)

const detectBrowser = () => {
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
