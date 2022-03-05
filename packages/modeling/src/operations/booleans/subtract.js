const flatten = require('../../utils/flatten')
const areAllShapesTheSameType = require('../../utils/areAllShapesTheSameType')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')

const subtractGeom2 = require('./subtractGeom2')
const subtractGeom3 = require('./subtractGeom3')

/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: [5,5,5]}), cuboid({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const subtract = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only subtract of the types are supported')
  }

  const geometry = geometries[0]
  // if (path.isA(geometry)) return pathsubtract(matrix, geometries)
  if (geom2.isA(geometry)) return subtractGeom2(geometries)
  if (geom3.isA(geometry)) return subtractGeom3(geometries)
  return geometry
}

module.exports = subtract
