/**
 * Represents a 3D geometry consisting of a list of parts consisting of 3D polygons.
 * @typedef {Object} slice
 * @property {Array} parts - list of parts, each part containing a list of 3D vertices
 */

/**
 * Creates a new empty slice.
 *
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.create
 */
export const create = (parts = []) => {
  return { parts }
}

export default create
