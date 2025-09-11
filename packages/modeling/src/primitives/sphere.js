import { ellipsoid } from './ellipsoid.js'
import { isGTE } from './commonChecks.js'

/**
 * Construct a sphere in three dimensional space where all vertices are at the same distance from the center.
 * @see [ellipsoid]{@link module:modeling/primitives.ellipsoid} for more options
 * @function
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of sphere
 * @param {number} [options.radius=1] - radius of sphere
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.sphere
 *
 * @example
 * let myshape = sphere({radius: 5})
 */
export const sphere = (options) => {
  const defaults = {
    center: [0, 0, 0],
    radius: 1,
    segments: 32,
    axes: [[1, 0, 0], [0, -1, 0], [0, 0, 1]]
  }
  let { center, radius, segments, axes } = Object.assign({}, defaults, options)

  if (!isGTE(radius, 0)) throw new Error('radius must be positive')

  radius = [radius, radius, radius]

  return ellipsoid({ center, radius, segments, axes })
}
