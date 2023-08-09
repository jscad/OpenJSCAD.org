import * as vec3 from '../vec3/index.js'

import { fromRotation } from './fromRotation.js'

/**
 * Create a matrix that rotates the given source to the given target vector.
 *
 * Each vector must be a directional vector with a length greater than zero.
 * @see https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
 * @param {Mat4} out - receiving matrix
 * @param {Vec3} source - source vector
 * @param {Vec3} target - target vector
 * @returns {Mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromVectorRotation
 * @example
 * let matrix = fromVectorRotation(create(), [1, 2, 2], [-3, 3, 12])
 */
export const fromVectorRotation = (out, source, target) => {
  const sourceNormal = vec3.normalize(vec3.create(), source)
  const targetNormal = vec3.normalize(vec3.create(), target)

  const axis = vec3.cross(vec3.create(), targetNormal, sourceNormal)
  const cosA = vec3.dot(targetNormal, sourceNormal)
  if (cosA === -1.0) return fromRotation(out, Math.PI, vec3.orthogonal(axis, sourceNormal))

  const k = 1 / (1 + cosA)
  out[0] = (axis[0] * axis[0] * k) + cosA
  out[1] = (axis[1] * axis[0] * k) - axis[2]
  out[2] = (axis[2] * axis[0] * k) + axis[1]
  out[3] = 0

  out[4] = (axis[0] * axis[1] * k) + axis[2]
  out[5] = (axis[1] * axis[1] * k) + cosA
  out[6] = (axis[2] * axis[1] * k) - axis[0]
  out[7] = 0

  out[8] = (axis[0] * axis[2] * k) - axis[1]
  out[9] = (axis[1] * axis[2] * k) + axis[0]
  out[10] = (axis[2] * axis[2] * k) + cosA
  out[11] = 0

  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}
