import * as vec3 from '../../maths/vec3/index.js'

import { isA } from './isA.js'

/**
 * Determine if the given object is a valid path3.
 * Checks for valid vertices, and duplicate vertices.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @function
 * @alias module:modeling/geometries/path3.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid path3 structure')
  }

  // check for duplicate vertices
  if (object.vertices.length > 1) {
    for (let i = 0; i < object.vertices.length; i++) {
      if (vec3.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.length])) {
        throw new Error(`path3 has duplicate vertex ${object.vertices[i]}`)
      }
    }
  }

  // check for infinity, nan
  object.vertices.forEach((vertex) => {
    if (!vertex.every(Number.isFinite)) {
      throw new Error(`path3 invalid non-finite vertex ${vertex}`)
    }
  })

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`path3 invalid transforms ${object.transforms}`)
  }
}
