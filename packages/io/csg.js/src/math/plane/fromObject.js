const vec3 = require('../../math/vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from an untyped object with identical properties
 */
const fromObject = (obj) => {
  if (Array.isArray(obj) === false) {
  // FIXME is this necessary?
    const normal = vec3.fromVarious(obj.normal)
    const w = parseFloat(obj.w)
    return fromValues(normal[0], normal[1], normal[2], w)
  }
  return fromValues(obj[0], obj[1], obj[2], obj[3])
}

module.exports = fromObject
