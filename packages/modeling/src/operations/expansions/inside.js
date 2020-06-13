/* Determine if the given points are inside the polygon.
 *
 * @param {Array} points - a list of points, where each point is an array with X and Y values
 * @param {Array} polygon - a list of points, where each point is an array with X and Y values
 * @return {Integer} 1 if all points are inside, 0 if some or none are inside
 */
const arePointsInside = (points, polygon) => {
  const sum = points.reduce((acc, point) => acc + isPointInside(point, polygon), 0)
  return sum === polygon.length ? 1 : 0
}

/* Determine if the given point is inside the polygon.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @param {Array} point - an array with X and Y values
 * @param {Array} polygon - a list of points, where each point is an array with X and Y values
 * @return {Integer} 1 if the point is inside, 0 if outside
 */
const isPointInside = (point, polygon) => {
  const n = polygon.length
  let counter = 0
  let p1 = polygon[0]
  for (let i = 1; i <= n; i++) {
    const p2 = polygon[i % n]
    if (point[1] > Math.min(p1[1], p2[1])) {
      if (point[1] <= Math.max(p1[1], p2[1])) {
        if (point[0] <= Math.max(p1[0], p2[0])) {
          if (p1[1] !== p2[1]) {
            const xinters = (point[1] - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0]
            if (p1[0] === p2[0] || point[0] <= xinters) {
              counter++
            }
          }
        }
      }
    }
    p1 = p2
  }

  if ((counter % 2) === 0) return 0
  return 1
}

module.exports = {
  arePointsInside,
  isPointInside
}
