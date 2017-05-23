const { version } = require('../jscad/version')

function env () {
  var env = 'OpenJSCAD ' + version
  if (typeof document !== 'undefined') {
    var w = document.defaultView
    env = env + ' [' + w.navigator.userAgent + ']'
  } else {
    if (typeof require === 'function') {
      var os = require('os')
      env = env + ' [' + os.type() + ':' + os.release() + ',' + os.platform() + ':' + os.arch() + ']'
    }
  }
  console.log(env)
}

module.exports = env
