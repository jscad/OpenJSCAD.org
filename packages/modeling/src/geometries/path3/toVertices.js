import { applyTransforms } from './applyTransforms.js'

/**
 * Produces an array of vertices from the given geometry.
 *
 * The returned array should not be modified as the data is shared with the geometry.
 *
 * @param {Path3} geometry - the geometry
 * @returns {Array} an array of vertices
 * @alias module:modeling/path3.toVertices
 *
 * @example
 * let sharedVertices = path3.toVertices(geometry)
 */
export const toVertices = (geometry) => applyTransforms(geometry).vertices
