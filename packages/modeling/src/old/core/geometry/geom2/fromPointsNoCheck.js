const fromSides = require('./fromSides')

/** Construct a Geom2 from a list of points (a polygon).
 * Like fromPoints() but does not check if the result is a valid polygon.
 * The points MUST rotate counter clockwise.
 * The points can define a convex or a concave polygon.
 * The polygon must not self intersect.
 * @param {Vec2[]} points - list of points in 2D space
 * @returns {Geom2} new Geom2 object
 */
const fromPointsNoCheck = points => {
  let prevPoint = points[points.length - 1]
  const sides = points.map(point => {
    const side = [prevPoint, point]
    prevPoint = point
    return side
  })
  return fromSides(sides)
}

module.exports = fromPointsNoCheck
