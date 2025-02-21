import { TAU } from '../maths/constants.js'

import { ellipse } from './ellipse.js'

import { isGTE } from './commonChecks.js'

/**
 * Construct a circle in two dimensional space where all points are at the same distance from the center.
 * @see [ellipse]{@link module:modeling/primitives.ellipse} for more options
 * @function
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of circle
 * @param {number} [options.radius=1] - radius of circle
 * @param {number} [options.startAngle=0] - start angle of circle, in radians
 * @param {number} [options.endAngle=TAU] - end angle of circle, in radians
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.circle
 * @example
 * let myshape = circle({radius: 10})
 */
export const circle = (options) => {
  const defaults = {
    center: [0, 0],
    radius: 1,
    startAngle: 0,
    endAngle: TAU,
    segments: 32
  }
  let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options)

  if (!isGTE(radius, 0)) throw new Error('radius must be positive')

  radius = [radius, radius]

  return ellipse({ center, radius, startAngle, endAngle, segments })
}
