import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 3D geometry consisting of a list of polygons.
 *
 * @typedef {Object} Geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more vertices
 * @property {Mat4} transforms - transforms to apply to the polygons, see transform()
 *
 * @example
 * {
 *   "polygons": [
 *     {"vertices": [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]]},
 *     {"vertices": [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]]},
 *     {"vertices": [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]},
 *     {"vertices": [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]]},
 *     {"vertices": [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]]},
 *     {"vertices": [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]}
 *   ],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */

/**
 * Create a new 3D geometry, empty or composed of the given polygons.
 *
 * @param {Array} [polygons] - list of polygons, or undefined
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.create
 *
 * @example
 * let geometry = geom3.create()
 */
export const create = (polygons = []) => ({ polygons, transforms: mat4.create() })
