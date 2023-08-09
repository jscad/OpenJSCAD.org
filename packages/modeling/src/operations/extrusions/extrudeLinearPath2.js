import * as geom2 from '../../geometries/geom2/index.js'
import * as path2 from '../../geometries/path2/index.js'

import { extrudeLinearGeom2 } from './extrudeLinearGeom2.js'

/*
 * Extrude the given geometry using the given options.
 *
 * @param {object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {number} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {Path2} geometry - the geometry to extrude
 * @returns {Geom3} the extruded 3D geometry
*/
export const extrudeLinearPath2 = (options, geometry) => {
  if (!geometry.isClosed) throw new Error('extruded path must be closed')
  // Convert path2 to geom2
  const points = path2.toPoints(geometry)
  const geometry2 = geom2.create([points])
  return extrudeLinearGeom2(options, geometry2)
}
