import * as vec2 from '../../maths/vec2/index.js'

import isA from './isA.js'
import toOutlines from './toOutlines.js'

/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid geom2 structure')
  }

  // check for duplicate points
  object.outlines.forEach((outline) => {
    for (let i = 0; i < outline.length; i++) {
      const j = (i + 1) % outline.length
      if (vec2.equals(outline[i], outline[j])) {
        throw new Error(`geom2 self-edge ${side[0]}`)
      }
    }
  })

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`geom2 invalid transforms ${object.transforms}`)
  }
}

export default validate
