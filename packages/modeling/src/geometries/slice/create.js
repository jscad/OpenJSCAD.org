/**
 * Represents a 3D geometry consisting of a list of contours consisting of 3D polygons.
 * @typedef {Object} slice
 * @property {Array} contours - list of contours, each part containing a list of 3D vertices
 */

/**
 * Creates a new empty slice.
 *
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.create
 */
export const create = (contours = []) => {
  return { contours }
}
