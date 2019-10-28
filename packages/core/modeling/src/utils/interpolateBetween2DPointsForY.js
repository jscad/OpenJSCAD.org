// Get the x coordinate of a point with a certain y coordinate, interpolated between two points.
// Interpolation is robust even if the points have the same y coordinate
const interpolateBetween2DPointsForY = (point1, point2, y) => {
  let f1 = y - point1[1]
  let f2 = point2[1] - point1[1]
  if (f2 < 0) {
    f1 = -f1
    f2 = -f2
  }
  let t
  if (f1 <= 0) {
    t = 0.0
  } else if (f1 >= f2) {
    t = 1.0
  } else if (f2 < 1e-10) { // FIXME Should this be EPS?
    t = 0.5
  } else {
    t = f1 / f2
  }
  let result = point1[0] + t * (point2[0] - point1[0])
  return result
}

module.exports = interpolateBetween2DPointsForY
