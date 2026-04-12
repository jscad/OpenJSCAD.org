/**
 * Creates a new slice from the given contours.
 *
 * NOTE: The slice (and all vertices) are assumed to be planar from the beginning.
 *
 * @param {Array} [contours] - a list of contours, where each contour contains a list of vertices (3D)
 * @returns {Slice} a new slice
 * @alias module:modeling/slice.create
 *
 * @example
 * const slice = slice.create([ [[0,0,1], [4,0,1], [4,3,1]] ])
 */
export const create = (contours = []) => ({ contours })
