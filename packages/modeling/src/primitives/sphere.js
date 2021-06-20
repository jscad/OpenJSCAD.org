const ellipsoid = require('./ellipsoid')

const { isGT } = require('./commonChecks')

/**
 * Construct a sphere in three dimensional space where all points are at the same distance from the center.
 * @see [ellipsoid]{@link module:modeling/primitives.ellipsoid} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of sphere
 * @param {Number} [options.radius=1] - radius of sphere
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.sphere
 *
 * @example
 * let myshape = sphere({radius: 5})
 */
const sphere = (options) => {
  const defaults = {
    center: [0, 0, 0],
    radius: 1,
    segments: 32
  }

  // NOTE default for axes is ommited intentionally, to allow ellipsoid to recognize when default is used
  options = Object.assign({}, defaults, options)
  const { radius } = options

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')

  options.radius = [radius, radius, radius]

  return ellipsoid(options)
}

module.exports = sphere
