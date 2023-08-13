/**
 * Performs a shallow clone of the give geometry.
 * @param {Path2} geometry - the geometry to clone
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.clone
 */
export const clone = (geometry) => Object.assign({}, geometry)
