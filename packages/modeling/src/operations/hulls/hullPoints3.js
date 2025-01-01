import * as poly3 from '../../geometries/poly3/index.js'

import { runner } from './quickhull/index.js'

/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y,z].
 *
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of polygons (poly3)
 * @alias module:modeling/hulls.hullPoints3
 */
export const hullPoints3 = (uniquePoints) => {
  const faces = runner(uniquePoints, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => uniquePoints[index])
    return poly3.create(vertices)
  })

  return polygons
}
