const cylinderElliptic = require('./cylinderElliptic')

const { isGT } = require('./commonChecks')

/**
 * Construct a solid cylinder in three dimensional space.
 * @see [cylinderElliptic]{@link module:modeling/primitives.cylinderElliptic} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder (at both start and end)
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinder
 *
 * @example
 * let myshape = cylinder({
 *     height: 2,
 *     radius: 10
 *   })
 */
const cylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    segments: 32
  }
  const { center, height, radius, segments } = Object.assign({}, defaults, options)

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')

  const newoptions = {
    center,
    height,
    startRadius: [radius, radius],
    endRadius: [radius, radius],
    segments
  }

  return cylinderElliptic(newoptions)
}

module.exports = cylinder
