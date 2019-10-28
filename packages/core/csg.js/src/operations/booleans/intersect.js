const flatten = require('../../utils/flatten')
const areAllShapesTheSameType = require('../../utils/areAllShapesTheSameType')

const { geom2, geom3 } = require('../../geometry')

const intersectGeom2 = require('./intersectGeom2')

const intersectGeom3 = require('./intersectGeom3')

/**
 * Return a new geometry representing space in both the first geometry and
 * all subsequent geometries.
 * Note: None of the given geometries are modified.
 *
 * @param {...geometries} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 *
 * @example
 * let myshape = intersect(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+
 * |       |
 * |   A   |
 * |    +--+----+   =   +--+
 * +----+--+    |       +--+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const intersect = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only intersect of the types are supported')
  }

  let geometry = geometries[0]
  // if (path.isA(geometry)) return pathintersect(matrix, geometries)
  if (geom2.isA(geometry)) return intersectGeom2(geometries)
  if (geom3.isA(geometry)) return intersectGeom3(geometries)
  return geometry
}

module.exports = intersect
