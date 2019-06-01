const vec2 = require('../math/vec2')

const geom2 = require('../geometry/geom2')

/** Construct an axis-aligned rectangle with four sides and four 90-degree angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[1,1]] - size of rectangle, width and height
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = rectangle({center: [5, 5, 5], size: [5, 10]})
 */
const rectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [1, 1]
  }
  const {size, center} = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 2) throw new Error('center must contain X and Y values')

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 2) throw new Error('size must contain X and Y values')

  const rswap = [size[0], -size[1]]

  const points = [
    vec2.subtract(center, size),
    vec2.add(center, rswap),
    vec2.add(center, size),
    vec2.subtract(center, rswap)
  ]
  return geom2.fromPoints(points)
}

/** Construct an axis-aligned square with four equal sides and four 90-degree angles.
 * @see {@link rectangle} for additional options, as this is an alias fo rectangle
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {Number} [options.size=1] - size of square
 * @returns {geom2} new 2D geometry
 *
 * @example
 * let myshape = square({center: [5, 5], size: 5})
 */
const square = (options) => {
  const defaults = {
    center: [0, 0],
    size: 1
  }
  let {center, size} = Object.assign({}, defaults, options)

  // TODO check that size is a number

  size = [size, size]

  return rectangle({center: center, size: size})
}

module.exports = {
  rectangle,
  square
}
