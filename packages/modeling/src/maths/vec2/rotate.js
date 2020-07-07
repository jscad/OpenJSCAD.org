const create = require('./create')

/**
 * Rotates the given vector by the given angle.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {Number} angle - the angle of rotation (radians)
 * @param {vec2} vector - the vector to rotate
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.rotate
 */
const rotate = (...params) => {
  let out
  let vector
  let angle
  if (params.length === 2) {
    out = create()
    angle = params[0]
    vector = params[1]
  } else {
    out = params[0]
    angle = params[1]
    vector = params[2]
  }

  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const x = vector[0]
  const y = vector[1]

  out[0] = x * c - y * s
  out[1] = x * s + y * c

  return out
}

module.exports = rotate
