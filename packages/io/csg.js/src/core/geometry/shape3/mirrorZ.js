const vec4 = require('../../math/vec4')
const mirror = require('./mirror')

const mirrorZ = shape3 => {
  let plane = vec4.fromValues(0, 0, 1, 0)
  return mirror(plane, shape3)
}

module.exports = mirrorZ
