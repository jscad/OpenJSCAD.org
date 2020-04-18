const vec2 = require('../../math/vec2')

const angleBetweenPoints = (p0, p1) => {
  return Math.atan2((p1[1] - p0[1]), (p1[0] - p0[0]))
}

const compareIndex = (index1, index2) => {
  if (index1.angle < index2.angle) {
    return -1
  } else if (index1.angle > index2.angle) {
    return 1
  } else {
    if (index1.distance < index2.distance) {
      return -1
    } else if (index1.distance > index2.distance) {
      return 1
    }
  }
  return 0
}

// Ported from https://github.com/bkiers/GrahamScan
const compute = (points) => {
  if (points.length < 3) {
    return points
  }

  // Find the lowest point
  let min = 0
  points.forEach((point, i) => {
    let minpoint = points[min]
    if (point[1] === minpoint[1]) {
      if (point[0] < minpoint[0]) {
        min = i
      }
    } else if (point[1] < minpoint[1]) {
      min = i
    }
  })

  // Calculate angles and distances from the lowest point
  let al = []
  let angle = 0.0
  let dist = 0.0
  for (let i = 0; i < points.length; i++) {
    if (i === min) {
      continue
    }
    angle = angleBetweenPoints(points[min], points[i])
    if (angle < 0) {
      angle += Math.PI
    }
    dist = vec2.squaredDistance(points[min], points[i])
    al.push({ index: i, angle: angle, distance: dist })
  }

  al.sort(function (a, b) { return compareIndex(a, b) })

  // Wind around the points CCW, removing interior points
  let stack = new Array(points.length + 1)
  let j = 2
  for (let i = 0; i < points.length; i++) {
    if (i === min) {
      continue
    }
    stack[j] = al[j - 2].index
    j++
  }
  stack[0] = stack[points.length]
  stack[1] = min

  const ccw = (i1, i2, i3) => {
    return (points[i2][0] - points[i1][0]) * (points[i3][1] - points[i1][1]) -
           (points[i2][1] - points[i1][1]) * (points[i3][0] - points[i1][0])
  }

  let tmp
  let M = 2
  for (let i = 3; i <= points.length; i++) {
    while (ccw(stack[M - 1], stack[M], stack[i]) < 1e-5) {
      M--
    }
    M++
    tmp = stack[i]
    stack[i] = stack[M]
    stack[M] = tmp
  }

  // Return the indices to the points
  const indices = new Array(M)
  for (let i = 0; i < M; i++) {
    indices[i] = stack[i + 1]
  }
  return indices
}

/*
 * Create a convex hull of the given set of points,  where each point is an array of [x,y].
 * @param {Array} uniquepoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of points that form the hull
 */
const hullPoints2 = (uniquepoints) => {
  let indices = compute(uniquepoints)

  let hullpoints = []
  if (Array.isArray(indices)) {
    hullpoints = indices.map((index) => uniquepoints[index])
  }
  return hullpoints
}

module.exports = hullPoints2
