module.exports = splitLineBetweenPoints
const vec3 = require('../vec3')

/**
 * Split the given line by the given plane.
 * Robust splitting, even if the line is parallel to the plane
 * @return {vec3} a new point
 */
function splitLineBetweenPoints (plane, p1, p2) {
  const direction = vec3.minus(p2, p1)
  let labda = (plane[3] - vec3.dot(plane, p1)) / vec3.dot(plane, direction)
  if (isNaN(labda)) labda = 0
  if (labda > 1) labda = 1
  if (labda < 0) labda = 0
  const result = vec3.plus(p1, vec3.times(direction, labda))
  return result
}
