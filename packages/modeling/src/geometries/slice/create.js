/**
 * Represents a 3D geometry consisting of a list of contours,
 * where each contour consists of a list of planar vertices.
 * @typedef {Object} slice
 * @property {Array} contours - list of contours, each contour containing a list of 3D vertices
 * @example
 * {"contours": [[[0,0,1], [4,0,1], [4,3,1]]]}
 */

/**
 * Creates a new slice from the given contours.
 *
 * @param {Array} [contours] - a list of contours, where each contour contains a list of vertices (3D)
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.create
 * @example
 * const slice = create([ [[0,0,1], [4,0,1], [4,3,1]] ])
 */
export const create = (contours = []) => {
  return { contours }
}
