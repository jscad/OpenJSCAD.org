import { create } from './create.js'

/**
 * Creates a new line initialized with the given values.
 *
 * @param {number} x - X coordinate of the unit normal
 * @param {number} y - Y coordinate of the unit normal
 * @param {number} d - distance of the line from [0,0]
 * @returns {Line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromValues
 */
export const fromValues = (x, y, d) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = d
  return out
}
