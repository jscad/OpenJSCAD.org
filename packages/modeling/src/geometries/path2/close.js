import { EPS } from '../../maths/constants.js'

import { distance } from '../../maths/vec2/distance.js'

import { clone } from './clone.js'

/**
 * Close the given geometry.
 *
 * @param {Path2} geometry - the path to close
 * @returns {Path2} a new path
 * @alias module:modeling/path2.close
 *
 * @example
 * let newPath = path2.close(oldPath)
 */
export const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const cloned = clone(geometry)
  cloned.isClosed = true

  if (cloned.points.length > 1) {
    // make sure the paths are formed properly
    const points = cloned.points
    const p0 = points[0]
    let pn = points[points.length - 1]
    while (distance(p0, pn) < EPS) {
      points.pop()
      if (points.length === 1) break
      pn = points[points.length - 1]
    }
  }
  return cloned
}
