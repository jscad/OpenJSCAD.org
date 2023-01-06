import * as vec2 from '../../maths/vec2/index.js'

import isA from './isA.js'
import measureArea from './measureArea.js'

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly2.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid poly2 structure')
  }

  // check for empty polygon
  if (object.vertices.length < 3) {
    throw new Error(`poly2 not enough vertices ${object.vertices.length}`)
  }
  // check area
  if (measureArea(object) <= 0) {
    throw new Error('poly2 area must be greater than zero')
  }

  // check for duplicate points
  for (let i = 0; i < object.vertices.length; i++) {
    if (vec2.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.length])) {
      throw new Error(`poly2 duplicate vertex at ${i}: [${object.vertices[i]}]`)
    }
  }

  // check for infinity, nan
  object.vertices.forEach((vertex) => {
    if (vertex.length != 2) {
      throw new Error(`poly2 invalid vertex ${vertex}`)
    }
    if (!vertex.every(Number.isFinite)) {
      throw new Error(`poly2 invalid vertex ${vertex}`)
    }
  })
}

export default validate
