
/**
 * Convert a shape2 to a list of points.
 * @param {Shape2} shape the shape to convert
 * @return {points[]} list of points in 2D space
 */
const toPoints = (params, shape) => {
  let points = cag.sides.map(function (side) {
    let v0 = side.vertex0
    // let v1 = side.vertex1
    return v0.pos
  })
  // due to the logic of fromPoints()
  // move the first point to the last
  if (points.length > 0) {
    points.push(points.shift())
  }
  return points
}

module.exports = toPoints
