import * as geom2 from '../../geometries/geom2/index.js'
import * as path2 from '../../geometries/path2/index.js'

import { extrudeLinearGeom2 } from './extrudeLinearGeom2.js'
import { extrudeLinearPath2 } from './extrudeLinearPath2.js'

/**
 * Extrude the given geometry in an upward linear direction using the given options.
 * Accepts path2 or geom2 objects as input. Paths must be closed.
 *
 * @param {object} options - options for extrude
 * @param {number} [options.height=1] the height of the extrusion
 * @param {number} [options.twistAngle=0] the final rotation (RADIANS) about the origin of the shape (if any)
 * @param {number} [options.twistSteps=1] the resolution of the twist about the axis (if any)
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded geometry, or a list of extruded geometry
 * @alias module:modeling/extrusions.extrudeLinear
 *
 * @example
 * let myshape = extrudeLinear({height: 10}, rectangle({size: [20, 25]}))
 */
export const extrudeLinear = (options, ...objects) => {
  const defaults = {
    height: 1,
    twistAngle: 0,
    twistSteps: 1,
    repair: true
  }
  const { height, twistAngle, twistSteps, repair } = Object.assign({ }, defaults, options)

  options = { offset: [0, 0, height], twistAngle, twistSteps, repair }

  const results = objects.map((object) => {
    if (path2.isA(object)) return extrudeLinearPath2(options, object)
    if (geom2.isA(object)) return extrudeLinearGeom2(options, object)
    // if (geom3.isA(object)) return geom3.extrude(options, object)
    if (Array.isArray(object)) return extrudeLinear(options, ...object)
    return object
  })
  return results.length === 1 ? results[0] : results
}
