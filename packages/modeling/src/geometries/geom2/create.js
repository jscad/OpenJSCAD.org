import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 *
 * @typedef Geom2
 * @type {Object}
 * @property {Array} outlines - list of outlines, where each outline is an ordered list of points
 * @property {Mat4} transforms - transforms to apply to the polygons, see transform()
 *
 * @example
 * // data structure
 * {
 *   "outlines": [[[-1,-1],[1,-1],[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
 * }
 */

/**
 * Create a new 2D geometry composed of outlines, either empty or containing the given outlines.
 *
 * @param {Array} [outlines] - list of outlines where each outline is an array of points
 * @returns {Geom2} a new geometry
 * @alias module:modeling/geom2.create
 *
 * @example
 * let myShape = geom2.create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
export const create = (outlines = []) => ({
  outlines,
  transforms: mat4.create()
})
