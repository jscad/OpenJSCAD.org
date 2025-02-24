import * as vec2 from '../../maths/vec2/index.js'

/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y].
 *
 * @see https://en.wikipedia.org/wiki/Graham_scan
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of points that form the hull
 * @alias module:modeling/hulls.hullPoints2
 */
export const hullPoints2 = (uniquePoints) => {
  // find min point
  let min = vec2.fromValues(Infinity, Infinity)
  uniquePoints.forEach((point) => {
    if (point[1] < min[1] || (point[1] === min[1] && point[0] < min[0])) {
      min = point
    }
  })

  // calculations relative to min point
  const squaredDistance = (point) => vec2.squaredDistance(point, min)
  const polarAngle = (point) => (point[0] === min[0] && point[1] === min[1]) ? -Infinity : -(point[0] - min[0]) / (point[1] - min[1])

  // points are sorted by polar angle in clockwise order
  const sorted = uniquePoints
  sorted.sort((pt1, pt2) => {
    const pa1 = polarAngle(pt1)
    const pa2 = polarAngle(pt2)
    if (pa1 === pa2) {
      // sort by the relative distances to min point
      return squaredDistance(pt1) - squaredDistance(pt2)
    }
    // sort by polar angles to min point
    return pa1 - pa2
  })

  const stack = [] // start with empty stack
  sorted.forEach((point) => {
    let cnt = stack.length
    while (cnt > 1 && ccw(stack[cnt - 2], stack[cnt - 1], point) <= Number.EPSILON) {
      // get rid of colinear and interior (clockwise) points
      stack.pop()
      cnt = stack.length
    }
    stack.push(point)
  })

  return stack
}

// returns: < 0 clockwise, 0 colinear, > 0 counter-clockwise
const ccw = (v1, v2, v3) => (v2[0] - v1[0]) * (v3[1] - v1[1]) - (v2[1] - v1[1]) * (v3[0] - v1[0])
