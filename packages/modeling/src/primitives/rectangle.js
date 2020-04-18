const vec2 = require('../math/vec2')

const geom2 = require('../geometry/geom2')

/**
 * Construct an axis-aligned rectangle with four sides and four 90-degree angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
const rectangle = (options) => {
  const defaults = {
    size: [2, 2]
  }
  const center = [0,0];
  const {size} = Object.assign({}, defaults, options)

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 2) throw new Error('size must contain X and Y values')

  const point = [size[0] / 2, size[1] / 2]
  const pswap = [point[0], -point[1]]

  const points = [
    vec2.subtract(center, point),
    vec2.add(center, pswap),
    vec2.add(center, point),
    vec2.subtract(center, pswap)
  ]
  return geom2.fromPoints(points)
}

/**
 * Construct an axis-aligned square with four equal sides and four 90-degree angles.
 * @see {@link rectangle} for additional options, as this is an alias fo rectangle
 * @param {Object} [options] - options for construction
 * @param {Number} [options.size=2] - dimension of square
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = square({size: 10})
 */
const square = (options) => {
  const defaults = {
    size: 2
  }
  let {size} = Object.assign({}, defaults, options)

  // TODO check that size is a number

  size = [size, size]

  return rectangle({size})
}

module.exports = {
  rectangle,
  square
}
