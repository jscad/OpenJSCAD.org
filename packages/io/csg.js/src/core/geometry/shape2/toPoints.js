
  /**
   * Convert to a list of points.
   * @return {points[]} list of points in 2D space
   */
  const toPoints = (cag) => {
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
