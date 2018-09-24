const create = require('./create')

/**
 * Rotate vector 3D vector around the x-axis
 * @param {vec3} out The receiving vec3 (optional)
 * @param {Number} angle The angle of rotation
 * @param {vec3} origin The origin of the rotation
 * @param {vec3} vector The vec3 point to rotate
 * @returns {vec3} out
 */
const rotateX = (...params) => {
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
  r[0] = p[0]
  r[1] = p[1] * Math.cos(angle) - p[2] * Math.sin(angle)
  r[2] = p[1] * Math.sin(angle) + p[2] * Math.cos(angle)

  // translate to correct position
  out[0] = r[0] + origin[0]
  out[1] = r[1] + origin[1]
  out[2] = r[2] + origin[2]

  return out
}

module.exports = rotateX
