const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides and four 90-degree angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
const rectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2]
  }
  const { center, size } = Object.assign({}, defaults, options)

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

module.exports = rectangle
