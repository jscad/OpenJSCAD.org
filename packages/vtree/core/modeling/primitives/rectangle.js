
// TODO: FORMAL DEFINITION VS IMPLEMENTATION
// GEOM: implementation
// anything before that: formal

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
  const { size, center } = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 2) throw new Error('center must contain X and Y values')

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 2) throw new Error('size must contain X and Y values')

  // FIXME: experimenting
  return Object.assign({}, { size, center }, { type: 'square' })
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

// FIXME: FROM V1
const square = (params) => {
  const _params = params
  return Object.assign({}, _params, { type: 'square' })
}

module.exports = rectangle
