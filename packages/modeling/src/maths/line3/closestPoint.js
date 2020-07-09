const vec3 = require('../vec3')

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {vec3} point - the point of reference
 * @param {line3} line - the line of reference
 * @returns {vec3} a point
 * @alias module:modeling/maths/line3.closestPoint
 */
const closestPoint = (point, line) => {
  const lpoint = line[0]
  const ldirection = line[1]

  const a = vec3.dot(vec3.subtract(point, lpoint), ldirection)
  const b = vec3.dot(ldirection, ldirection)
  const t = a / b

  const closestpoint = vec3.add(lpoint, vec3.scale(t, ldirection))
  return closestpoint
}

module.exports = closestPoint
