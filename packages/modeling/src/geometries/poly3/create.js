/**
 * Creates a new 3D polygon with initial values.
 *
 * @param {Array} [vertices] - a list of vertices (3D)
 * @returns {Poly3} a new polygon
 * @alias module:modeling/poly3.create
 *
 * @example
 * const polygon = poly3.create([[1, 0], [0, 1], [0, 0]])
 */
export const create = (vertices = []) => ({ vertices })
