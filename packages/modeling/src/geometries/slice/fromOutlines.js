import * as vec3 from '../../maths/vec3/index.js'

import { create } from './create.js'

/**
 * Create a slice from the given outlines.
 *
 * @param {Array} outlines - where each outline is an array of ordered points
 * @returns {Slice} a new slice
 * @alias module:modeling/slice.fromOutlines
 */
export const fromOutlines = (outlines) => {
  // Convert from 2D points to 3D vertices
  const contours = outlines.map((outline) => outline.map((point) => vec3.fromVec2(vec3.create(), point)))
  return create(contours)
}
