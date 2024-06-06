import * as poly3 from '../../geometries/poly3/index.js'
import * as plane from '../../maths/plane/index.js'
import * as vec3 from '../../maths/vec3/index.js'
import { calculatePlane } from './calculatePlane.js'
import { isA } from './isA.js'

/**
 * Determine if the given object is a valid slice.
 * Checks for valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/slice.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid slice structure')
  }

  const slicePlane = calculatePlane(object)
  object.contours.forEach((contour, i) => {
    if (contour.length < 3) {
      throw new Error(`slice contour ${i} must contain at least 3 vertices`)
    }

    // contours must be coplanar
    const contourPlane = poly3.plane(poly3.create(contour))
    if (!plane.equals(slicePlane, contourPlane)) {
      throw new Error('slice contours must be coplanar')
    }

    for (let i = 0; i < contour.length; i++) {
      const vertex = contour[i]
      // check for infinity, nan
      if (!vertex.every(Number.isFinite)) {
        throw new Error(`slice contour ${i} must contain finite vertices`)
      }

      // check for duplicate points
      const j = (i + 1) % contour.length
      if (vec3.equals(contour[i], contour[j])) {
        throw new Error(`slice contour ${i} has duplicate vertex ${contour[i]}`)
      }
    }
  })
}
