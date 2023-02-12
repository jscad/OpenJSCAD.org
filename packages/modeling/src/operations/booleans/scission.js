import { flatten } from '../../utils/flatten.js'

// import geom2 from '../../geometries/geom2'
import * as geom3 from '../../geometries/geom3/index.js'

// import scissionGeom2 from './scissionGeom2'
import { scissionGeom3 } from './scissionGeom3.js'

/**
 * Scission (divide) the given geometry into the component pieces.
 *
 * @param {...Object} objects - list of geometries
 * @returns {Array} list of pieces from each geometry
 * @alias module:modeling/booleans.scission
 *
 * @example
 * let figure = use('./my.stl')
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
export const scission = (...objects) => {
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
