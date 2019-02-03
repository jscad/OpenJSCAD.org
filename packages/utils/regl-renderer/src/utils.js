function flatten (array) {
  return [].concat(...array)
}
function toArray (data) {
  if (data === undefined || data === null) { return [] }
  if (data.constructor !== Array) { return [data] }
  return data
}

/** kinda, sorta like a nested object.assign, so that nested object values
 * do not get lost
 * note : this is NOT actually making anything immutable !
 * @param  {} output={}
 * @param  {} currentState
 * @param  {} options
 */
function merge (output = {}, currentState, options) {
  output = currentState // JSON.parse(JSON.stringify(currentState))
  Object.keys(options).forEach(function (key) {
    const item = options[key]
    const isObject = typeof item === 'object'
    const isFunction = typeof item === 'function'
    const isArray = Array.isArray(item)

    if (isFunction) {
      output[key] = options[key]
    } else if (isArray) {
      const current = currentState[key] || []
      output[key] = Object.assign([], ...current, options[key])
    } else if (isObject) {
      const current = currentState[key] || {}
      output[key] = merge({}, current, item)
    } else {
      output[key] = options[key]
    }
  })

  return output
}

module.exports = {
  flatten,
  toArray,
  merge
}
