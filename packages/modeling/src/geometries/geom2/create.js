import * as mat4 from '../../maths/mat4/index.js'

/**
 * Create a new 2D geometry composed of polygon outlines.
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
