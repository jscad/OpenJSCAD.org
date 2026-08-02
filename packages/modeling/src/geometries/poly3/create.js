/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 *
 * @typedef {Object} Poly3
 * @property {Array} vertices - list of ordered vertices (3D)
 *
 * @example
 * // data structure
 * {
 *   vertices: [[0,0,0], [4,0,0], [4,3,12]]
 * }
 */

/**
 * Creates a new 3D polygon with initial values, or empty.
 *
 * @param {Array} [vertices] - a list of vertices (3D)
 * @returns {Poly3} a new polygon
 * @alias module:modeling/poly3.create
 *
 * @example
 * const polygon = poly3.create([[1, 0], [0, 1], [0, 0]])
 */
export const create = (vertices = []) => ({ vertices })
