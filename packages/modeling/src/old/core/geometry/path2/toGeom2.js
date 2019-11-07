
const expand = require('../geom2/expand')
const fromSides = require('../geom2/fromSides')
const fromPoints = require('../geom2/fromPoints')

// Expand the path to a Geom2
// This traces the path with a circle with radius pathradius if radius is passed, otherwise just uses the points
const toGeom2 = (path, pathradius, resolution) => {
  if (pathradius) {
    if (!path.closed) throw new Error('The path should be closed!')
    return fromPoints(path.points)
  }
  let sides = []
  let numpoints = path.points.length
  let startIndex = 0
  if (path.closed && (numpoints > 2)) startIndex = -1
  let prevPoint
  for (let i = startIndex; i < numpoints; i++) {
    let pointIndex = i
    if (pointIndex < 0) pointIndex = numpoints - 1
    const point = path.points[pointIndex]
    if (i > startIndex) {
      let side = [prevPoint, point]
      sides.push(side)
    }
    prevPoint = point
  }
  let shellShape = fromSides(sides)
  let expanded = expand({ radius: pathradius, resolution }, shellShape)
  return expanded
}

module.exports = toGeom2
