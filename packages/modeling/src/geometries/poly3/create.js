/**
 * Represents a convex 3D polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex shape. The vertices do not have to be `vec3`
 * instances but they must behave similarly.
 * @property {Array} vertices - list of ordered vertices (3D)
 * @example
 * {"vertices": [[0,0,0], [4,0,0], [4,3,12]]}
 */

/**
 * Creates a new 3D polygon with initial values.
 *
 * @param {Array} [vertices] - a list of vertices (3D)
 * @returns {Poly3} a new polygon
 * @alias module:modeling/geometries/poly3.create
 * @example
 * const polygon = create([[1, 0], [0, 1], [0, 0]])
 */
export const create = (vertices = []) => ({ vertices })
