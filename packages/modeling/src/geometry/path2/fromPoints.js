const {EPS} = require('../../math/constants')

const vec2 = require('../../math/vec2')

const close = require('./close')
const create = require('./create')

/**
 * Create a new path from the given points.
 * The points must be provided an array of points,
 * where each point is an array of two numbers.
 * @param {Array} points - array of points from which to create the path
 * @param {boolean} [options.closed] - if the path should be open or closed
 * @returns {path} new path
 * @example:
 * my newpath = fromPoints({closed: true}, [[10, 10], [-10, 10]])
 */
const fromPoints = (options, points) => {
  const defaults = {closed: false}
  let {closed} = Object.assign({}, defaults, options)

  let created = create()
  created.points = points.map((point) => vec2.fromArray(point))

  // check if first and last points are equal
  if (created.points.length > 1) {
    let p0 = created.points[0]
    let pn = created.points[created.points.length - 1]
    if (vec2.distance(p0, pn) < (EPS*EPS)) {
      // and close automatically
      closed = true
    }
  }
  if (closed === true) created = close(created)

  return created
}


module.exports = fromPoints
