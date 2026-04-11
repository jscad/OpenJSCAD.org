import * as mplane from '../../maths/plane/index.js'

/**
 * Determine the plane of the given polygon.
 *
 * @param {Poly3} polygon - the polygon of which to fetch the plane
 * @alias module:modeling/poly3.plane
 */
export const plane = (polygon) => {
  if (!polygon.plane) {
    polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices)
  }
  return polygon.plane
}
