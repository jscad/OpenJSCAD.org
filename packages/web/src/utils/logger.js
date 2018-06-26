const makeLogger = (params) => {
  const defaults = {
    enabled: false
  }
  const {enabled} = Object.assign({}, defaults, params)
  const debug = (...params) => {
    if (enabled) {
      console.debug(...params)
    }
  }
  const info = enabled ? console.info.bind(window.console) : () => {}
  /* (...params) => {
    if (enabled) {
      console.log('arguments', arguments.callee)
      console.log(...params) 
    }
  } */
  const error = (...params) => {
    if (enabled) {
      console.error(...params)
    }
  }
  return {
    debug,
    info,
    error
  }
}

module.exports = makeLogger
