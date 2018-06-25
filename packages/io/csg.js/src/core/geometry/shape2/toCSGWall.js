const fromPolygons = require('../shape3/fromPolygons')

/** convert a CAG to a CSG 'wall' of zero thickness
 * @param  {} z0
 * @param  {} z1
 */
const toCSGWall = function (cag, z0, z1) {
  let polygons = cag.sides.map(function (side) {
    return side.toPolygon3D(z0, z1)
  })
  return fromPolygons(polygons)
}

module.exports = toCSGWall
