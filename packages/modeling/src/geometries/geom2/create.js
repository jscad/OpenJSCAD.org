import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 2D geometry consisting of a list of 2D polygons.
 * @typedef {Object} geom2
 * @property {Array} outlines - list of polygon outlines
 * @property {mat4} transforms - transforms to apply to the geometry, see transform()
 */

/**
 * Create a new 2D geometry composed of polygon outlines.
 * @param {Array} [outlines] - list outlines where each outline is an array of points
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.create
 */
export const create = (outlines) => {
  if (outlines === undefined) {
    outlines = [] // empty contents
  }
  return {
    outlines,
    transforms: mat4.create()
  }
}

export default create
