/**
 * Performs a shallow clone of the give geometry.
 *
 * @param {Path2} geometry - the geometry to clone
 * @returns {Path2} a new path
 * @alias module:modeling/path2.clone
 *
 * @example
 * let newPath = path2.clone(oldPath)
 */
export const clone = (geometry) => Object.assign({}, geometry)
