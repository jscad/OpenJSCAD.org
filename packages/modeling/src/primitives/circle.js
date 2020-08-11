const ellipse = require('./ellipse')

/**
 * Construct a circle in two dimensional space where are points are at the same distance from the center.
 * @see [ellipse]{@link module:modeling/primitives.ellipse} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of circle
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.circle
 * @example
 * let myshape = circle({radius: 10})
 */
const circle = (options) => {
  const defaults = {
    center: [0, 0],
    radius: 1,
    segments: 32
  }
  let { center, radius, segments } = Object.assign({}, defaults, options)

  if (!Number.isFinite(radius)) throw new Error('radius must be a number')

  radius = [radius, radius]

  return ellipse({ center, radius, segments })
}

module.exports = circle
