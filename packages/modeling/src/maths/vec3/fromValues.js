import { create } from './create.js'

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {number} x - X component
 * @param {number} y - Y component
 * @param {number} z - Z component
 * @returns {Vec3} a new vector
 * @alias module:modeling/maths/vec3.fromValues
 */
export const fromValues = (x, y, z) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = z
  return out
}
