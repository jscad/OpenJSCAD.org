const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')
const path2 = require('../../geometries/path2')

const offsetGeom2 = require('./offsetGeom2')
const offsetPath2 = require('./offsetPath2')

/**
 * Create offset geometry from the given geometry using the given options.
 * Offsets from internal and external space are created.
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type of corner to create after offseting; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Object} objects - the geometries to offset
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.offset
 *
 * @example
 * let small = offset({ delta: -4, corners: 'chamfer' }, square({size: 40})) // contract
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
