const measureArea = require('./measureArea')
const flip = require('./flip')

/**
 * Determine if the given points are inside the given polygon.
 *
 * @param {Array} points - a list of points, where each point is an array with X and Y values
 * @param {poly2} polygon - a 2D polygon
 * @return {Integer} 1 if all points are inside, 0 if some or none are inside
 * @alias module:modeling/geometries/poly2.arePointsInside
 */
const arePointsInside = (points, polygon) => {
  if (points.length === 0) return 0 // nothing to check

  if (measureArea(polygon) < 0) {
    polygon = flip(polygon) // CCW is required
  }
  const vertices = polygon.vertices
  if (vertices.length === 0) return 0 // nothing can be inside an empty polygon

  const sum = points.reduce((acc, point) => acc + isPointInside(point, vertices), 0)
  return sum === points.length ? 1 : 0
}

/*
 * Determine if the given point is inside the polygon.
 *
 * @see http://geomalgorithms.com/a03-_inclusion.html
 * @param {Array} point - an array with X and Y values
 * @param {Array} polygon - a list of points, where each point is an array with X and Y values
 * @return {Integer} 1 if the point is inside, 0 if outside
 */
const isPointInside = (point, polygon) => {
  let wn = 0
  const n = polygon.length
  const x = point[0]
  const y = point[1]
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i]
    const p2 = polygon[(i + 1) % n]
    if (x !== p1[0] && y !== p1[1] && x !== p2[0] && y !== p2[1]) { // no overlap of points
      if (p1[1] <= y) {
        if (p2[1] > y) { // upward crossing
          if (isLeft(p1, p2, point) > 0) { // point left of edge
            wn++
          }
        }
      } else {
        if (p2[1] <= y) { // downward crossing
          if (isLeft(p1, p2, point) < 0) { // point right of edge
            wn--
          }
        }
      }
    }
  }
  return wn
}

const isLeft = (p0, p1, p2) => (p1[0] - p0[0]) * (p2[1] - p0[1]) - (p2[0] - p0[0]) * (p1[1] - p0[1])

module.exports = arePointsInside
