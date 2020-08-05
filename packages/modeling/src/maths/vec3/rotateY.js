const create = require('./create')

/**
 * Rotate the given vector around the given origin, Y axis only.
 * @param {vec3} [out] - the receiving vector
 * @param {Number} angle - the angle of rotation
 * @param {vec3} origin - the origin of the rotation
 * @param {vec3} vector - the vector to rotate
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.rotateY
 */
const rotateY = (...params) => {
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

  // translate point to the origin
  p[0] = vector[0] - origin[0]
  p[1] = vector[1] - origin[1]
  p[2] = vector[2] - origin[2]

  // perform rotation
  r[0] = p[2] * Math.sin(angle) + p[0] * Math.cos(angle)
  r[1] = p[1]
  r[2] = p[2] * Math.cos(angle) - p[0] * Math.sin(angle)

  // translate to correct position
  out[0] = r[0] + origin[0]
  out[1] = r[1] + origin[1]
  out[2] = r[2] + origin[2]

  return out
}

module.exports = rotateY
