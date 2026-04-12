import { applyTransforms } from './applyTransforms.js'

/**
 * Produces an array of points from the given geometry.
 *
 * NOTE: The returned array should not be modified as the data is shared with the geometry.
 *
 * @param {Path2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/path2.toPoints
 *
 * @example
 * let sharedPoints = path2.toPoints(geometry)
 */
export const toPoints = (geometry) => applyTransforms(geometry).points
