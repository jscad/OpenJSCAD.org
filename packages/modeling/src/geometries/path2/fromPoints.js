const { EPS } = require('../../maths/constants')

const vec2 = require('../../maths/vec2')

const close = require('./close')
const create = require('./create')

/**
 * Create a new path from the given points.
 * The points must be provided an array of points,
 * where each point is an array of two numbers.
 * @param {Object} options - options for construction
 * @param {Boolean} [options.closed=false] - if the path should be open or closed
 * @param {Array} points - array of points (2D) from which to create the path
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.fromPoints
 *
 * @example:
 * my newpath = fromPoints({closed: true}, [[10, 10], [-10, 10]])
 */
const fromPoints = (options, points) => {
  const defaults = { closed: false }
  let { closed } = Object.assign({}, defaults, options)

  let created = create()
  created.points = points.map((point) => vec2.clone(point))

  // check if first and last points are equal
  if (created.points.length > 1) {
    const p0 = created.points[0]
    const pn = created.points[created.points.length - 1]
    if (vec2.distance(p0, pn) < (EPS * EPS)) {
      // and close automatically
      closed = true
    }
  }
  if (closed === true) created = close(created)

  return created
}

module.exports = fromPoints
