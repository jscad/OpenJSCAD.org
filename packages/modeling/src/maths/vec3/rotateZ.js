const create = require('./create')

/**
 * Rotate the given vector around the given origin, Z axis only.
 * @param {vec3} [out] - the receiving vector
 * @param {Number} angle - the angle of rotation in radians
 * @param {vec3} origin - the origin of the rotation
 * @param {vec3} vector - the vector to rotate
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.rotateZ
 */
const rotateZ = (...params) => {
  let out
  let angle
  let vector
  let origin
  if (params.length === 3) {
    out = create()
    angle = params[0]
    origin = params[1]
    vector = params[2]
  } else {
    out = params[0]
    angle = params[1]
    origin = params[2]
    vector = params[3]
  }
  const p = []
  const r = []
  // Translate point to the origin
  p[0] = vector[0] - origin[0]
  p[1] = vector[1] - origin[1]

  // perform rotation
  r[0] = (p[0] * Math.cos(angle)) - (p[1] * Math.sin(angle))
  r[1] = (p[0] * Math.sin(angle)) + (p[1] * Math.cos(angle))

  // translate to correct position
  out[0] = r[0] + origin[0]
  out[1] = r[1] + origin[1]
  out[2] = vector[2]

  return out
}

module.exports = rotateZ
