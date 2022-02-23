const flatten = require('../../utils/flatten')

// const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')

// const scissionGeom2 = require('./scissionGeom2')
const scissionGeom3 = require('./scissionGeom3')

/**
 * Scission (divide) the given geometry into the component pieces.
 *
 * @param {...Object} objects - list of geometries
 * @returns {Array} list of pieces from each geometry
 * @alias module:modeling/booleans.scission
 *
 * @example
 * let figure = require('./my.stl')
 * let pieces = scission(figure)
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   +---+            | A +---+
 * |   |    +---+   =   |   |    +---+
 * +---+    |   |       +---+    |   |
 *      +---+   |            +---+   |
 *      |       |            |    B  |
 *      +-------+            +-------+
 */
const scission = (...objects) => {
  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    // if (path2.isA(object)) return path2.transform(matrix, object)
    // if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return scissionGeom3(object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = scission
