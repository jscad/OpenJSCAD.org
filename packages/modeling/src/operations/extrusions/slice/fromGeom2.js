import * as vec3 from '../../../maths/vec3/index.js'
import { toOutlines } from '../../../geometries/geom2/index.js'

import create from './create.js'

/**
 * Create a slice from a geom2.
 *
 * @param {Object} geometry - the 2D geometry to create a slice from
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.fromGeom2
 */
export const fromGeom2 = (geometry) => {
  // Convert from 2D points to 3D
  const parts = toOutlines(geometry).map((outline) => {
    return outline.map((point) => vec3.fromVec2(vec3.create(), point))
  })
  return create(parts)
}

export default fromGeom2
