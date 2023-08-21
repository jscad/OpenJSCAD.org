import * as vec2 from '../../maths/vec2/index.js'

import { intersect } from '../../maths/utils/intersect.js'

import { isA } from './isA.js'
import { toOutlines } from './toOutlines.js'

/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid geom2 structure')
  }

  object.outlines.forEach((outline, i) => {
    if (outline.length < 3) {
      throw new Error(`geom2 outline ${i} must contain at least 3 points`)
    }
    // check for duplicate points
    for (let i = 0; i < outline.length; i++) {
      const j = (i + 1) % outline.length
      if (vec2.equals(outline[i], outline[j])) {
        throw new Error(`geom2 outline ${i} duplicate point ${outline[i]}`)
      }
    }
  })

  // check for self-intersection
  toOutlines(object).forEach((outline, i) => {
    // check for intersection between [a1, a2] and [b1, b2]
    for (let a1 = 0; a1 < outline.length; a1++) {
      const a2 = (a1 + 1) % outline.length
      for (let b1 = 0; b1 < outline.length; b1++) {
        const b2 = (b1 + 1) % outline.length
        if (a1 !== b1) {
          const int = intersect(outline[a1], outline[a2], outline[b1], outline[b2], false)
          if (int) {
            throw new Error(`geom2 outline ${i} self intersection at ${int}`)
          }
        }
      }
    }
  })

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`geom2 invalid transforms ${object.transforms}`)
  }
}
