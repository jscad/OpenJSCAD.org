import * as mplane from '../../maths/plane/index.js'

/**
 * Determine the plane of the given polygon.
 */
export const plane = (polygon) => {
  if (!polygon.plane) {
    polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices)
  }
  return polygon.plane
}
