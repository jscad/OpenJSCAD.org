const cuboid = require('./cuboid')

const { isGTE } = require('./commonChecks')

/**
 * Construct an axis-aligned solid cube in three dimensional space with six square faces.
 * @see [cuboid]{@link module:modeling/primitives.cuboid} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cube
 * @param {Number} [options.size=2] - dimension of cube
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cube
 * @example
 * let myshape = cube({size: 10})
 */
const cube = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: 2
  }
  let { center, size } = Object.assign({}, defaults, options)

  if (!isGTE(size, 0)) throw new Error('size must be positive')

  size = [size, size, size]

  return cuboid({ center, size })
}

module.exports = cube
