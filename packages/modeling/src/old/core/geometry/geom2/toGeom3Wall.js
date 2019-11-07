const fromPolygons = require('../geom3/fromPolygons')

/** convert a Geom2 to a Geom3 'wall' of zero thickness
 * @param  {} z0
 * @param  {} z1
 */
const toGeom3Wall = (geometry, z0, z1) => {
  const polygons = geometry.sides.map( side => {
    return side.toPolygon3D(z0, z1)
  })
  return fromPolygons(polygons)
}

module.exports = toGeom3Wall
