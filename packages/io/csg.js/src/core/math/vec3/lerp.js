module.exports = lerp
const create = require('./create')

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {Number} t interpolation amount between the two inputs
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function lerp (...params) {
  let out
  let t
  let a
  let b
  if (params.length === 2) {
    out = create()
    t = params[0]
    a = params[1]
    b = params[2]
  } else {
    out = params[0]
    t = params[1]
    a = params[2]
    b = params[3]
  }
  let ax = a[0]
  let ay = a[1]
  let az = a[2]
  out[0] = ax + t * (b[0] - ax)
  out[1] = ay + t * (b[1] - ay)
  out[2] = az + t * (b[2] - az)
  return out
}
