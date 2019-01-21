const { EPS } = require('../../constants')
const vec2 = require('../../math/vec2')

/**
 * Create a Path2 from a list of points
 * @param {Vec2[]} [points=[]] - list of points
 * @param {boolean} [closed=false] - closer of path
 *
 * @example:
 * path2.fromPoints([[10,10], [-10,10], [-10,-10], [10,-10]], true) // closed
 */
const fromPoints = (points, closed) => {
  closed = !!closed
  points = points || []
  // re-parse the points into Vec2
  // and remove any duplicate points
  let prevpoint = null
  if (closed && (points.length > 0)) {
    prevpoint = vec2.fromValues(...points[points.length - 1])
  }
  let newpoints = []
  points.forEach(point => {
    point = vec2.fromValues(...point)
    let skip = false
    if (prevpoint !== null) {
      skip = vec2.distance(point, prevpoint) < EPS
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
