const {EPS} = require('../constants')
const vec2 = require('../../math/vec2')

/** Class Path2D
 * Represents a series of points, connected by infinitely thin lines.
 * A path can be open or closed, i.e. additional line between first and last points.
 * The difference between Path2D and CAG is that a path is a 'thin' line, whereas a CAG is an enclosed area.
 * @constructor
 * @param {Vector2D[]} [points=[]] - list of points
 * @param {boolean} [closed=false] - closer of path
 *
 * @example
 * new CSG.Path2D()
 * new CSG.Path2D([[10,10], [-10,10], [-10,-10], [10,-10]], true) // closed
 */
const fromPoints = (points, closed) => {
  closed = !!closed
  points = points || []
    // re-parse the points into Vector2D
    // and remove any duplicate points
  let prevpoint = null
  if (closed && (points.length > 0)) {
    prevpoint = vec2.fromValues(...points[points.length - 1])
  }
  let newpoints = []
  points.map(function (point) {
    point = vec2.fromValues(...point)
    let skip = false
    if (prevpoint !== null) {
      let distance = point.distanceTo(prevpoint)
      skip = distance < EPS
    }
    if (!skip) newpoints.push(point)
    prevpoint = point
  })

  return {
    points: newpoints,
    closed
  }
}

module.exports = fromPoints
