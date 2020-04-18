const vec3 = require('../../../math/vec3')

const splitLineSegmentByPlane = (plane, p1, p2) => {
  const direction = vec3.subtract(p2, p1)
  let lambda = (plane[3] - vec3.dot(plane, p1)) / vec3.dot(plane, direction)
  if (Number.isNaN(lambda)) lambda = 0
  if (lambda > 1) lambda = 1
  if (lambda < 0) lambda = 0

  vec3.scale(direction, lambda, direction)
  vec3.add(direction, p1, direction)
  return direction
}

module.exports = splitLineSegmentByPlane
