// see http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ :
// Area of the polygon. For a counter clockwise rotating polygon the area is positive, otherwise negative
// Note(bebbi): this looks wrong. See polygon getArea()
const area = function (shape2) {
  let polygonArea = 0
  shape2.sides.map(function (side) {
    polygonArea += side.vertex0.pos.cross(side.vertex1.pos)
  })
  polygonArea *= 0.5
  return polygonArea
}

module.exports = area
