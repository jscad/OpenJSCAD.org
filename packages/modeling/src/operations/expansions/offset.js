const flatten = require('../../utils/flatten')

const { geom2, path2 } = require('../../geometry')

const offsetGeom2 = require('./offsetGeom2')
const offsetPath2 = require('./offsetPath2')

/**
 * Create offset geometry(s) from the given object(s) using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {Object|Array} objects - object(s) to offset
 * @return {Object|Array} the offset objects(s)
 */
const offset = (options, ...objects) => {
  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (path2.isA(object)) return offsetPath2(options, object)
    if (geom2.isA(object)) return offsetGeom2(options, object)
    // if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = offset
