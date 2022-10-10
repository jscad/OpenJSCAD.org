import { EPS } from '../../maths/constants.js'

import * as vec2 from '../../maths/vec2/index.js'

import clone from './clone.js'

/**
 * Close the given geometry.
 * @param {path2} geometry - the path to close
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.close
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
    while (vec2.distance(p0, pn) < (EPS * EPS)) {
      points.pop()
      if (points.length === 1) break
      pn = points[points.length - 1]
    }
  }
  return cloned
}

export default close
