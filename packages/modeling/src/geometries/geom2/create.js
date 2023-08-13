import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * @property {Array} outlines - list of polygon outlines
 * @property {Mat4} transforms - transforms to apply to the geometry, see transform()
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
 * @returns {Geom2} a new geometry
 * @alias module:modeling/geometries/geom2.create
 * @example
 * let myShape = create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
export const create = (outlines = []) => ({
  outlines,
  transforms: mat4.create()
})
