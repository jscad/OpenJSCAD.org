const fromPolygons = require('../shape3/fromPolygons')

/** convert a Shape2 to a Shape3 'wall' of zero thickness
 * @param  {} z0
 * @param  {} z1
 */
const toShape3Wall = function (shape, z0, z1) {
  const polygons = shape.sides.map(function (side) {
    return side.toPolygon3D(z0, z1)
  })
  return fromPolygons(polygons)
}

module.exports = toShape3Wall
