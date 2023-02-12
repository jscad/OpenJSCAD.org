/**
 * Performs a shallow clone of the give geometry.
 * @param {path2} geometry - the geometry to clone
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.clone
 */
export const clone = (geometry) => Object.assign({}, geometry)
