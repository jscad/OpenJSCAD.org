import { runner } from '../../operations/hulls/quickhull/index.js'
import { create } from './create.js'
import * as poly3 from '../poly3/index.js'

/**
 * Construct a new convex 3D geometry from a list of unique points.
 *
 * @param {Array} uniquePoints - list of points to construct convex 3D geometry
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPointsConvex
 */
export const fromPointsConvex = (uniquePoints) => {
  if (!Array.isArray(uniquePoints)) {
    throw new Error('the given points must be an array')
  }

  const faces = runner(uniquePoints, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => uniquePoints[index])
    return poly3.create(vertices)
  })

  return create(polygons)
}
