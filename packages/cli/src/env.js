const version = require('../package.json').version

const env = () => {
  let env = 'JSCAD ' + version
  if (typeof document !== 'undefined') {
    const w = document.defaultView
    env = env + ' [' + w.navigator.userAgent + ']'
  } else {
    if (typeof require === 'function') {
      const os = require('os')
      env = env + ' [' + os.type() + ':' + os.release() + ',' + os.platform() + ':' + os.arch() + ']'
    }
  }
  console.log(env)
}

module.exports = env
