const vec3 = require('../vec3')
const { solve2Linear } = require('../utils')

const { EPS } = require('../constants')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Create a line in 3D space from the intersection of the given planes.
 *
 * @param {plane} a - the first plane of reference
 * @param {plane} b - the second plane of reference
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.fromPlanes
 */
const fromPlanes = (plane1, plane2) => {
  let direction = vec3.cross(plane1, plane2)
  let length = vec3.length(direction)
  if (length < EPS) {
    throw new Error('parallel planes do not intersect')
  }
  length = (1.0 / length)
  direction = vec3.scale(length, direction)

  const absx = Math.abs(direction[0])
  const absy = Math.abs(direction[1])
  const absz = Math.abs(direction[2])
  let origin
  let r
  if ((absx >= absy) && (absx >= absz)) {
    // find a point p for which x is zero
    r = solve2Linear(plane1[1], plane1[2], plane2[1], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(0, r[0], r[1])
  } else if ((absy >= absx) && (absy >= absz)) {
    // find a point p for which y is zero
    r = solve2Linear(plane1[0], plane1[2], plane2[0], plane2[2], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], 0, r[1])
  } else {
    // find a point p for which z is zero
    r = solve2Linear(plane1[0], plane1[1], plane2[0], plane2[1], plane1[3], plane2[3])
    origin = vec3.fromValues(r[0], r[1], 0)
  }
  return fromPointAndDirection(origin, direction)
}

module.exports = fromPlanes
