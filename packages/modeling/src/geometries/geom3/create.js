import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @typedef {Object} geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more vertices
 * @property {mat4} transforms - transforms to apply to the polygons, see transform()
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
 * Create a new 3D geometry composed of the given polygons.
 * @param {Array} [polygons] - list of polygons, or undefined
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.create
 */
export const create = (polygons) => {
  if (polygons === undefined) {
    polygons = [] // empty contents
  }
  return {
    polygons,
    transforms: mat4.create()
  }
}
