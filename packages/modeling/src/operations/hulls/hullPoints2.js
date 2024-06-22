const vec2 = require('../../maths/vec2')

/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y].
 * @see https://en.wikipedia.org/wiki/Graham_scan
 *
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of points that form the hull
 * @alias module:modeling/hulls.hullPoints2
 */
const hullPoints2 = (uniquePoints) => {
  // find min point
  let min = vec2.fromValues(Infinity, Infinity)
  uniquePoints.forEach((point) => {
    if (point[1] < min[1] || (point[1] === min[1] && point[0] < min[0])) {
      min = point
    }
  })

  // gather information for sorting by polar coordinates (point, angle, distSq)
  const points = []
  uniquePoints.forEach((point) => {
    // use faster fakeAtan2 instead of Math.atan2
    const angle = fakeAtan2(point[1] - min[1], point[0] - min[0])
    const distSq = vec2.squaredDistance(point, min)
    points.push({ point, angle, distSq })
  })

  // sort by polar coordinates
  points.sort((pt1, pt2) => pt1.angle !== pt2.angle
    ? pt1.angle - pt2.angle
    : pt1.distSq - pt2.distSq)

  const stack = [] // start with empty stack
  points.forEach((point) => {
    let cnt = stack.length
    while (cnt > 1 && ccw(stack[cnt - 2], stack[cnt - 1], point.point) <= Number.EPSILON) {
      stack.pop() // get rid of colinear and interior (clockwise) points
      cnt = stack.length
    }
    stack.push(point.point)
  })

  return stack
}

// returns: < 0 clockwise, 0 colinear, > 0 counter-clockwise
const ccw = (v1, v2, v3) => (v2[0] - v1[0]) * (v3[1] - v1[1]) - (v2[1] - v1[1]) * (v3[0] - v1[0])

// Returned "angle" is really 1/tan (inverse of slope) made negative to increase with angle.
// This function is strictly for sorting in this algorithm.
const fakeAtan2 = (y, x) => {
  // The "if" is a special case for when the minimum vector found in loop above is present.
  // We need to ensure that it sorts as the minimum point. Otherwise, this becomes NaN.
  if (y === 0 && x === 0) {
    return -Infinity
  } else {
    return -x / y
  }
}

module.exports = hullPoints2
