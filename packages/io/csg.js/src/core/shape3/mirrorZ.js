const vec4 = require('../math/vec4')
const mirror = require('./mirror')

/** return a clone of the input shape, mirrored along the Z axis
 * @param  {Shape3} shape the shape to mirror
 * @returns {Shape3} the mirrored shape
 */
const mirrorZ = shape => {
  const plane = vec4.fromValues(0, 0, 1, 0)
  return mirror(plane, shape)
}

module.exports = mirrorZ
