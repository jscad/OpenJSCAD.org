const flatten = require('../../utils/flatten')
const areAllShapesTheSameType = require('../../utils/areAllShapesTheSameType')

const { geom2, geom3, path2 } = require('../../geometry')

const hullPath2 = require('./hullPath2')
const hullGeom2 = require('./hullGeom2')
const hullGeom3 = require('./hullGeom3')

/** Create a convex hull of the given geometries.
 * @param {...geometries} geometries - list of geometries from which to create a hull
 * @returns {geometry} new geometry
 *
 * @example:
 * let myshape = hull(rectangle({center: [-5,-5]}), ellipse({center: [5,5]}))
 *
 * @example
 * +-------+           +-------+
 * |       |           |        \
 * |   A   |           |         \
 * |       |           |          \
 * +-------+           +           \
 *                  =   \           \
 *       +-------+       \           +
 *       |       |        \          |
 *       |   B   |         \         |
 *       |       |          \        |
 *       +-------+           +-------+
 */
const hull = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only unions of the same type are supported')
  }

  let geometry = geometries[0]
  if (path2.isA(geometry)) return hullPath2(geometries)
  if (geom2.isA(geometry)) return hullGeom2(geometries)
  if (geom3.isA(geometry)) return hullGeom3(geometries)

  // FIXME should this throw an error for unknown geometries?
  return geometry
}

module.exports = hull
