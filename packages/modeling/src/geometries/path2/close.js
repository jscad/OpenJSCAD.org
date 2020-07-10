const { EPS } = require('../../maths/constants')

const vec2 = require('../../maths/vec2')

const clone = require('./clone')

/**
 * Close the given geometry.
 * @param {path2} geometry - the path to close
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.close
 */
const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const cloned = clone(geometry)
  cloned.isClosed = true

  if (cloned.points.length > 1) {
    // make sure the paths are formed properly
    const points = cloned.points
    const p0 = points[0]
    let pn = points[points.length - 1]
    while (vec2.distance(p0, pn) < (EPS * EPS)) {
      points.pop()
      if (points.length === 1) break
      pn = points[points.length - 1]
    }
  }
  return cloned
}

module.exports = close
