import * as vec2 from '../../maths/vec2/index.js'

import { toPoints } from './toPoints.js'

/**
  * Determine if the given paths are equal.
  * For closed paths, this includes equality under point order rotation.
  * @param {path2} a - the first path to compare
  * @param {path2} b - the second path to compare
  * @returns {Boolean}
  * @alias module:modeling/geometries/path2.equals
  */
export const equals = (a, b) => {
  if (a.isClosed !== b.isClosed) {
    return false
  }
  if (a.points.length !== b.points.length) {
    return false
  }

  const aPoints = toPoints(a)
  const bPoints = toPoints(b)

  // closed paths might be equal under graph rotation
  // so try comparison by rotating across all points
  const length = aPoints.length
  let offset = 0
  do {
    let unequal = false
    for (let i = 0; i < length; i++) {
      if (!vec2.equals(aPoints[i], bPoints[(i + offset) % length])) {
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
