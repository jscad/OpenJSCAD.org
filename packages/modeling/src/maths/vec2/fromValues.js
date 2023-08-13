import { create } from './create.js'

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Vec2} a new vector
 * @alias module:modeling/maths/vec2.fromValues
 */
export const fromValues = (x, y) => {
  const out = create()
  out[0] = x
  out[1] = y
  return out
}
