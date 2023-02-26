import * as poly3 from '../poly3/index.js'

import { create } from './create.js'

/**
 * Construct a new 3D geometry from a list of points.
 * The list of points should contain sub-arrays, each defining a single polygon of points.
 * In addition, the points should follow the right-hand rule for rotation in order to
 * define an external facing polygon.
 * @param {Array} listOfPoints - list of lists, where each list is a set of points to construct a polygon
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPoints
 */
export const fromPoints = (listOfPoints) => {
  if (!Array.isArray(listOfPoints)) {
    throw new Error('the given points must be an array')
  }

  const polygons = listOfPoints.map((points, index) => {
    // TODO catch the error, and rethrow with index
    return poly3.create(points)
  })
  return create(polygons)
}
