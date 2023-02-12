import * as poly3 from '../poly3/index.js'

import create from './create.js'

/**
 * Construct a new 3D geometry from a list of points.
 * The list of points should contain sub-arrays, each defining a single polygon of points.
 * In addition, the points should follow the right-hand rule for rotation in order to
 * define an external facing polygon.
 * @param {Array} listofpoints - list of lists, where each list is a set of points to construct a polygon
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPoints
 */
export const fromPoints = (listofpoints) => {
  if (!Array.isArray(listofpoints)) {
    throw new Error('the given points must be an array')
  }

  const polygons = listofpoints.map((points, index) => {
    // TODO catch the error, and rethrow with index
    const polygon = poly3.create(points)
    return polygon
  })
  const result = create(polygons)
  return result
}
