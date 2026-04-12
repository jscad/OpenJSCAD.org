import * as mat4 from '../../maths/mat4/index.js'

/**
 * Create an empty, open path.
 *
 * @param {Array} [points] - a list of points of which to create the path
 * @returns {Path2} a new path
 * @alias module:modeling/path2.create
 *
 * @example
 * let newPath = path2.create()
 */
export const create = (points = []) => ({ points: points, isClosed: false, transforms: mat4.create() })
