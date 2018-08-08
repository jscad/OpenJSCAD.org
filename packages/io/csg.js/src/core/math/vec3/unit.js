module.exports = unit
const fromValues = require('./fromValues')
const length = require('./length')

/**
 * Calculates the unit length of a vec3
 *
 * @param {vec3} a vector to calculate unit length of
 * @returns {Number} unit length of a
 */
function unit (a) {
  const l = length(a)
  return fromValues(a[0] / l, a[1] / l, a[2] / l)
}
