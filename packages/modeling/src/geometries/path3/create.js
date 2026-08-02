import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 3D geometry consisting of a list of ordered vertices.
 *
 * @typedef {Object} Path3
 * @property {Array} vertices - list of ordered vertices
 * @property {boolean} isClosed - true if the path is closed where start and end vertices are the same
 * @property {Mat4} transforms - transforms to apply to the vertices, see transform()
 *
 * @example
 * // data structure
 * {
 *   vertices: [[0,0,0], [4,0,0], [4,3,0]],
 *   isClosed: true,
 *   transforms: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */

/**
 * Create an empty, open path.
 *
 * @param {Array} [vertices] - a list of vertices of which to create the path
 * @returns {Path3} a new path
 * @alias module:modeling/path3.create
 *
 * @example
 * let pathA = path3.create()
 * let pathB = path3.create([[0,0,0], [4,0,0], [4,3,0]])
 */
export const create = (vertices = []) => ({ vertices: vertices, isClosed: false, transforms: mat4.create() })
