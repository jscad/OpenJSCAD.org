const fromSides = require('./fromSides')
const Side = require('./math/Side')

// FIXME: this might not be needed anymore

// Converts a Shape3 to a Shape2 The CSG must consist of polygons with only z coordinates +1 and -1
// as constructed by _toCSGWall(-1, 1). This is so we can use the 3D union(), intersect() etc
const fromFakeShape3 = shape => {
  const sides = shape.polygons
    .map(polygon => Side._fromFakePolygon(polygon))
    .filter(side => side !== null)

  return fromSides(sides)
}

module.exports = fromFakeShape3
