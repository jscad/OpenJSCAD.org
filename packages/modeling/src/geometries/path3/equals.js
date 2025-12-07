import * as vec3 from '../../maths/vec3/index.js'

import { toVertices } from './toVertices.js'

/**
 * Determine if the given paths are equal.
 *
 * For closed paths, this includes equality by vertex order rotation.
 *
 * @param {Path3} a - the first path to compare
 * @param {Path3} b - the second path to compare
 * @returns {boolean}
 * @function
 * @alias module:modeling/geometries/path3.equals
 */
export const equals = (a, b) => {
  if (a.isClosed !== b.isClosed) {
    return false
  }
  if (a.vertices.length !== b.vertices.length) {
    return false
  }

  const aVertices = toVertices(a)
  const bVertices = toVertices(b)

  // closed paths might be equal under graph rotation
  // so try comparison by rotating across all vertices
  const length = aVertices.length
  let offset = 0
  do {
    let unequal = false
    for (let i = 0; i < length; i++) {
      if (!vec3.equals(aVertices[i], bVertices[(i + offset) % length])) {
        unequal = true
        break
      }
    }
    if (unequal === false) {
      return true
    }
    // unequal open paths should only be compared once, never rotated
    if (!a.isClosed) {
      return false
    }
  } while (++offset < length)
  return false
}
