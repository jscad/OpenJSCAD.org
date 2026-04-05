import * as mat4 from '../../maths/mat4/index.js'

/**
 * Create an empty, open path.
 *
 * @returns {Path3} a new path
 * @alias module:modeling/path3.create
 *
 * @example
 * let pathA = path3.create()
 * let pathB = path3.create([[0,0,0], [4,0,0], [4,3,0]])
 */
export const create = (vertices = []) => ({ vertices: vertices, isClosed: false, transforms: mat4.create() })
