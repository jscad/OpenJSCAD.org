const {EPS} = require('../../math/constants')

const vec2 = require('../../math/vec2')

const clone = require('./clone')

/**
 * Close the given geometry.
 * @params {geometry} the path to close
 * @returns {path} the closed path
 */
const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const cloned = clone(geometry)
  cloned.isClosed = true
 
  if (cloned.points.length > 1) {
    // make sure the paths are formed properly
    let points = cloned.points
    let p0 = points[0]
    let pn = points[points.length - 1]
    while (vec2.distance(p0, pn) < (EPS*EPS)) {
      points.pop()
      if (points.length === 1) break
      pn = points[points.length - 1]
    }
  }
  return cloned
}

module.exports = close
