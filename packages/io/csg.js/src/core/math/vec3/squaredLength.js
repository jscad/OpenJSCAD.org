module.exports = squaredLength

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength (a) {
  let x = a[0]
  let y = a[1]
  let z = a[2]
  return x * x + y * y + z * z
}
