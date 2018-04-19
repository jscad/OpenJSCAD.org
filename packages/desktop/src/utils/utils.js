function isCAG (object) {
  // objects[i] instanceof CAG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('sides' in object)) {
    return false
  }
  if (!object.sides.length) {
    return false
  }

  return true
}

function isCSG (object) {
  // objects[i] instanceof CSG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('polygons' in object)) {
    return false
  }
  if (!object.polygons.length) {
    return false
  }
  return true
}
/* converts input data to array if it is not already an array */
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
      output[key] = Object.assign([], current, options[key])
    } else if (isObject) {
      const current = currentState[key] || {}
      output[key] = merge({}, current, item)
    } else {
      output[key] = options[key]
    }
  })

  return output
}

const head = (array) => {
  if (array === undefined || null) {
    return undefined
  }
  if (array.length === 0) {
    return undefined
  }
  return array[0]
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

module.exports = {
  isCSG,
  isCAG,
  toArray,
  merge,
  head,
  flatten
}
