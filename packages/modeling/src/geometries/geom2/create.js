import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * @typedef {Object} geom2
 * @property {Array} outlines - list of polygon outlines
 * @property {mat4} transforms - transforms to apply to the geometry, see transform()
 * @example
 * // data structure
 * {
 *   "outlines": [[[-1,-1],[1,-1],[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
 * }
 */

/**
 * Create a new 2D geometry composed of polygon outlines.
 * @param {Array} [outlines] - list of outlines where each outline is an array of points
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.create
 * @example
 * let myShape = create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
export const create = (outlines = []) => {
  return {
    outlines,
    transforms: mat4.create()
  }
}

export default create
