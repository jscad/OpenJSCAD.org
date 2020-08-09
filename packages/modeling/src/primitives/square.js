const rectangle = require('./rectangle')

/**
 * Construct an axis-aligned square in two dimensional space with four equal sides and four 90-degree angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {Number} [options.size=2] - dimension of square
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
const square = (options) => {
  const defaults = {
    center: [0, 0],
    size: 2
  }
  let { center, size } = Object.assign({}, defaults, options)

  if (!Number.isFinite(size)) throw new Error('size must be a number')

  size = [size, size]

  return rectangle({ center, size })
}

module.exports = square
