import { applyTransforms } from './applyTransforms.js'

/**
 * Produces an array of vertices from the given geometry.
 *
 * The returned array should not be modified as the data is shared with the geometry.
 *
 * @param {Path3} geometry - the geometry
 * @returns {Array} an array of vertices
 * @function
 * @alias module:modeling/geometries/path3.toVertices
 *
 * @example
 * let sharedVertices = toVertices(path)
 */
export const toVertices = (geometry) => applyTransforms(geometry).vertices
