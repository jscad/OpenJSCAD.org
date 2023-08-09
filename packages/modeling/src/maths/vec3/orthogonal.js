import { abs } from './abs.js'
import { create } from './create.js'
import { cross } from './cross.js'

/**
 * Create a new vector that is orthogonal to the given vector.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector of reference
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.orthogonal
 */
export const orthogonal = (out, vector) => {
  const bV = abs(create(), vector)
  const b0 = 0 + ((bV[0] < bV[1]) && (bV[0] < bV[2]))
  const b1 = 0 + ((bV[1] <= bV[0]) && (bV[1] < bV[2]))
  const b2 = 0 + ((bV[2] <= bV[0]) && (bV[2] <= bV[1]))

  return cross(out, vector, [b0, b1, b2])
}
