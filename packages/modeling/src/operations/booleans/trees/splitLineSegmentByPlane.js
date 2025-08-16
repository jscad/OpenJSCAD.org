import * as vec3 from '../../../maths/vec3/index.js'

export const splitLineSegmentByPlane = (plane, p1, p2) => {
  const direction = vec3.subtract(vec3.create(), p2, p1)
  let lambda = (plane[3] - vec3.dot(plane, p1)) / vec3.dot(plane, direction)

  Number.isNaN(lambda) ? lambda = 0
    : lambda > 1 ? lambda = 1
      : lambda < 0 ? lambda = 0
        : lambda

  vec3.scale(direction, direction, lambda)
  vec3.add(direction, p1, direction)
  return direction
}
