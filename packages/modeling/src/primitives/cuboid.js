const geom3 = require('../geometries/geom3')
const poly3 = require('../geometries/poly3')

/**
 * Construct an axis-aligned solid cuboid in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.size=[2,2,2]] - dimensions of cuboid; width, depth, height
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cuboid
 *
 * @example
 * let myshape = cuboid(size: [5, 10, 5]})
 */
const cuboid = (options) => {
  const defaults = {
    size: [2, 2, 2]
  }
  const center = [0, 0, 0]
  const { size } = Object.assign({}, defaults, options)

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 3) throw new Error('size must contain width, depth and height values')

  const result = geom3.create(
    // adjust a basic shape to size
    [
      [[0, 4, 6, 2], [-1, 0, 0]],
      [[1, 3, 7, 5], [+1, 0, 0]],
      [[0, 1, 5, 4], [0, -1, 0]],
      [[2, 6, 7, 3], [0, +1, 0]],
      [[0, 2, 3, 1], [0, 0, -1]],
      [[4, 5, 7, 6], [0, 0, +1]]
    ].map((info) => {
      const points = info[0].map((i) => {
        const pos = [
          center[0] + (size[0] / 2) * (2 * !!(i & 1) - 1),
          center[1] + (size[1] / 2) * (2 * !!(i & 2) - 1),
          center[2] + (size[2] / 2) * (2 * !!(i & 4) - 1)
        ]
        return pos
      })
      return poly3.fromPoints(points)
    })
  )
  return result
}

/**
 * Construct an axis-aligned solid cube in three dimensional space with six square faces.
 * @see [cuboid]{@link module:modeling/primitives.cuboid} for more options
 * @param {Object} [options] - options for construction
 * @param {Number} [options.size=2] - dimension of cube
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cube
 * @example
 * let myshape = cube({size: 10})
 */
const cube = (options) => {
  const defaults = {
    size: 2
  }
  let { size } = Object.assign({}, defaults, options)

  if (!Number.isFinite(size)) throw new Error('size must be a number')

  size = [size, size, size]

  return cuboid({ size: size })
}

module.exports = {
  cube,
  cuboid
}
