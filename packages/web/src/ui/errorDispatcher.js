// Call this routine to install a handler for uncaught exceptions
function AlertUserOfUncaughtExceptions () {
  window.onerror = function (message, url, line) {
    var msg = 'uncaught exception'
    switch (arguments.length) {
      case 1: // message
        msg = arguments[0]
        break
      case 2: // message and url
        msg = arguments[0] + '\n(' + arguments[1] + ')'
        break
      case 3: // message and url and line#
        msg = arguments[0] + '\nLine: ' + arguments[2] + '\n(' + arguments[1] + ')'
        break
      case 4: // message and url and line# and column#
      case 5: // message and url and line# and column# and Error
        msg = arguments[0] + '\nLine: ' + arguments[2] + ',col: ' + arguments[3] + '\n(' + arguments[1] + ')'
        break
      default:
        break
    }
    if (typeof document == 'object') {
      var e = document.getElementById('errordiv')
      if (e !== null) {
        e.firstChild.textContent = msg
        e.style.display = 'block'
      }
    } else {
      console.log(msg)
    }
    return false
  }
}

module.exports = AlertUserOfUncaughtExceptions
