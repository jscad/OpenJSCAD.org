const create = require('./create')

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} a - the first operand
 * @param {vec3} b - the second operand
 * @returns {vec3} out
 */
const cross = (...params) => {
  let out
  let a
  let b
  if (params.length === 2) {
    out = create()
    a = params[0]
    b = params[1]
  } else {
    out = params[0]
    a = params[1]
    b = params[2]
  }
  const ax = a[0]
  const ay = a[1]
  const az = a[2]
  const bx = b[0]
  const by = b[1]
  const bz = b[2]

  out[0] = ay * bz - az * by
  out[1] = az * bx - ax * bz
  out[2] = ax * by - ay * bx
  return out
}

module.exports = cross
