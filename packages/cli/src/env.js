const version = '[VI]{version}[/VI]' // version is injected by rollup

export const env = () => {
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
