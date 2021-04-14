const vec2 = require('../../maths/vec2')

const toPoints = require('./toPoints')

/**
  * Determine if the given paths are equal.
  * For closed paths, this includes equality under point order rotation.
  * @param {path2} a - the first path to compare
  * @param {path2} b - the second path to compare
  * @returns {Boolean}
  * @alias module:modeling/geometries/path2.equals
  */
const equals = (a, b) => {
  if (a.isClosed !== b.isClosed) {
    return false
  }
  if (a.points.length !== b.points.length) {
    return false
  }

  const apoints = toPoints(a)
  const bpoints = toPoints(b)

  // closed paths might be equal under graph rotation
  // so try comparison by rotating across all points
  const length = apoints.length
  let offset = 0
  do {
    let unequal = false
    for (let i = 0; i < length; i++) {
      if (!vec2.equals(apoints[i], bpoints[(i + offset) % length])) {
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

module.exports = equals
