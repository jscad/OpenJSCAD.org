const vec3 = require('../vec3')

/**
 * Split the given line by the given plane.
 * Robust splitting, even if the line is parallel to the plane
 * @return {vec3} a new point
 */
const splitLineSegmentByPlane = (plane, p1, p2) => {
  const direction = vec3.subtract(p2, p1)
  let lambda = (plane[3] - vec3.dot(plane, p1)) / vec3.dot(plane, direction)
  if (Number.isNaN(lambda)) lambda = 0
  if (lambda > 1) lambda = 1
  if (lambda < 0) lambda = 0
  const result = vec3.plus(p1, vec3.scale(lambda, direction))
  return result
}

module.exports = splitLineSegmentByPlane
