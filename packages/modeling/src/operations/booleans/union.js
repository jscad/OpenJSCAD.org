const flatten = require('../../utils/flatten')
const areAllShapesTheSameType = require('../../utils/areAllShapesTheSameType')

const { geom2, geom3 } = require('../../geometry')

const unionGeom2 = require('./unionGeom2')
const unionGeom3 = require('./unionGeom3')

/**
 * Return a new geometry representing the total space in the given geometries.
 * NOTE: None of the given geometries are modified.
 *
 * @param {...geometry} geometries - list of geometries to union
 * @returns {geom2|geom3} a new geometry
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

  let geometry = geometries[0]
  // if (path.isA(geometry)) return pathunion(matrix, geometries)
  if (geom2.isA(geometry)) return unionGeom2(geometries)
  if (geom3.isA(geometry)) return unionGeom3(geometries)
  return geometry
}

module.exports = union
