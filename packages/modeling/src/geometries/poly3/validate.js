import { signedDistanceToPoint } from '../../maths/plane/index.js'
import { NEPS } from '../../maths/constants.js'
import * as vec3 from '../../maths/vec3/index.js'

import { isA } from './isA.js'
import { isConvex } from './isConvex.js'
import { measureArea } from './measureArea.js'
import { plane } from './plane.js'

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid poly3 structure')
  }

  // check for empty polygon
  if (object.vertices.length < 3) {
    throw new Error(`poly3 not enough vertices ${object.vertices.length}`)
  }
  // check area
  if (measureArea(object) <= 0) {
    throw new Error('poly3 area must be greater than zero')
  }

  // check for duplicate points
  for (let i = 0; i < object.vertices.length; i++) {
    if (vec3.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.length])) {
      throw new Error(`poly3 duplicate vertex ${object.vertices[i]}`)
    }
  }

  // check convexity
  if (!isConvex(object)) {
    throw new Error('poly3 must be convex')
  }

  // check for infinity, nan
  object.vertices.forEach((vertex) => {
    if (!vertex.every(Number.isFinite)) {
      throw new Error(`poly3 invalid vertex ${vertex}`)
    }
  })

  // check that points are co-planar
  if (object.vertices.length > 3) {
    const normal = plane(object)
    object.vertices.forEach((vertex) => {
      const dist = Math.abs(signedDistanceToPoint(normal, vertex))
      if (dist > NEPS) {
        throw new Error(`poly3 must be coplanar: vertex ${vertex} distance ${dist}`)
      }
    })
  }
}
