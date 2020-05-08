const flatten = require('../../utils/flatten')
const areAllShapesTheSameType = require('../../utils/areAllShapesTheSameType')

const geom2 = require('../../geometry/geom2')
const geom3 = require('../../geometry/geom3')

const unionGeom2 = require('./unionGeom2')
const unionGeom3 = require('./unionGeom3')

/**
 * Return a new geometry representing the total space in the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.union
 *
 * @example
 * let myshape = union(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |       +----+
 * +----+--+    |       +----+       |
 *      |   B   |            |       |
 *      |       |            |       |
 *      +-------+            +-------+
 */
const union = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only unions of the same type are supported')
  }

  const geometry = geometries[0]
  // if (path.isA(geometry)) return pathunion(matrix, geometries)
  if (geom2.isA(geometry)) return unionGeom2(geometries)
  if (geom3.isA(geometry)) return unionGeom3(geometries)
  return geometry
}

module.exports = union
