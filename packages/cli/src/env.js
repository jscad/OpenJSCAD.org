import os from 'os'
import process from 'process'

const version = '[VI]{version}[/VI]' // version is injected by rollup

export const env = () => {
  const nodeVersion = process.version

  let env = 'JSCAD CLI ' + version + ', Node.js ' + nodeVersion
  if (typeof document !== 'undefined') {
    const w = document.defaultView
    env = env + ' [' + w.navigator.userAgent + ']'
  } else {
    env = env + ' [' + os.type() + ':' + os.release() + ',' + os.platform() + ':' + os.arch() + ']'
  }
  console.log(env)
}
