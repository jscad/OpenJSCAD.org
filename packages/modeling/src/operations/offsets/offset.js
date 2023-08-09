import { flatten } from '../../utils/flatten.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

import { offsetGeom2 } from './offsetGeom2.js'
import { offsetGeom3 } from './offsetGeom3.js'
import { offsetPath2 } from './offsetPath2.js'

/**
 * Create offset geometry from the given geometry using the given options.
 * Offsets from internal and external space are created.
 * @param {object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {string} [options.corners='edge'] - type of corner to create after offseting; edge, chamfer, round
 * @param {number} [options.segments=16] - number of segments when creating round corners
 * @param {...Object} objects - the geometries to offset
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/offsets.offset
 *
 * @example
 * let small = offset({ delta: -4, corners: 'chamfer' }, square({size: 40})) // contract
 */
export const offset = (options, ...objects) => {
  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (path2.isA(object)) return offsetPath2(options, object)
    if (geom2.isA(object)) return offsetGeom2(options, object)
    if (geom3.isA(object)) return offsetGeom3(options, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}
