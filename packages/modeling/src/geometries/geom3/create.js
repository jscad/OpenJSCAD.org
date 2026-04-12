import * as mat4 from '../../maths/mat4/index.js'

/**
 * Create a new 3D geometry composed of the given polygons.
 *
 * @param {Array} [polygons] - list of polygons, or undefined
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.create
 *
 * @example
 * let geometry = geom3.create()
 */
export const create = (polygons = []) => ({ polygons, transforms: mat4.create() })
