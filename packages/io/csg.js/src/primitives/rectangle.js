const vec2 = require('../math/vec2')

const geom2 = require('../geometry/geom2')

/**
 * Construct an axis-aligned rectangle with four sides and four 90-degree angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = rectangle({center: [5, 5, 5], size: [10, 20]})
 */
const rectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2]
  }
  const {size, center} = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 2) throw new Error('center must contain X and Y values')

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
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {Number} [options.size=2] - dimension of square
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = square({center: [5, 5], size: 10})
 */
const square = (options) => {
  const defaults = {
    center: [0, 0],
    size: 2
  }
  let {center, size} = Object.assign({}, defaults, options)

  // TODO check that size is a number

  size = [size, size]

  return rectangle({center, size})
}

module.exports = {
  rectangle,
  square
}
