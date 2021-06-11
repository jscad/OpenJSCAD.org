const vec3 = require('../vec3')
const { solve2Linear } = require('../utils')

const { EPS } = require('../constants')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Create a line the intersection of the given planes.
 *
 * @param {line3} out - receiving line
 * @param {plane} plane1 - first plane of reference
 * @param {plane} plane2 - second plane of reference
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPlanes
 */
const fromPlanes = (out, plane1, plane2) => {
  let direction = vec3.cross(vec3.create(), plane1, plane2)
  let length = vec3.length(direction)
  if (length < EPS) {
    throw new Error('parallel planes do not intersect')
  }
  length = (1.0 / length)
  direction = vec3.scale(direction, direction, length)

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
  return fromPointAndDirection(out, origin, direction)
}

module.exports = fromPlanes
