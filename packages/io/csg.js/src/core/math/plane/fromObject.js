const vec3 = require('../../math/vec3')
const fromData = require('./fromData')

/**
 * Create a new plane from an untyped object with identical properties
 */
const fromObject = obj => {
  if (Array.isArray(obj) === false) {
  // FIXME is this necessary?
    let normal = vec3.fromVarious(obj.normal)
    let w = parseFloat(obj.w)
    return fromData([normal[0], normal[1], normal[2], w])
  }
  return fromData(obj)
}

module.exports = fromObject
