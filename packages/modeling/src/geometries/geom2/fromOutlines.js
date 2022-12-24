import * as vec2 from '../../maths/vec2/index.js'

import create from './create.js'

/**
 * Create a new 2D geometry from the given outlines.
 * The geometry must not self intersect, i.e. the sides cannot cross.
 * @param {Array} outlines - list of outlines in 2D space
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromOutlines
 */
export const fromOutlines = (outlines) => {
  if (!Array.isArray(outlines)) {
    throw new Error('the given outlines must be an array')
  }
  if (outlines.length > 0 && !Array.isArray(outlines[0])) {
    throw new Error('the given outlines must be arrays of points')
  }

  const sides = []
  outlines.forEach((outline) => {
    let length = outline.length
    if (vec2.equals(outline[0], outline[length - 1])) {
      length--
    }
    let previous = outline[length - 1]
    for (let i = 0; i < length; i++) {
      const point = outline[i]
      sides.push([vec2.clone(previous), vec2.clone(point)])
      previous = point
    }
  })
  return create(sides)
}

export default fromOutlines
