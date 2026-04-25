/**
 * Performs a shallow clone of the give geometry.
 *
 * @param {Path3} geometry - the geometry to clone
 * @returns {Path3} a new path
 * @alias module:modeling/path3.clone
 *
 * @example
 * let newPath = path3.clone(oldPath)
 */
export const clone = (geometry) => Object.assign({}, geometry)
