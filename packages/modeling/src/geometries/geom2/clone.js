/**
 * Performs a shallow clone of the given geometry.
 * @param {Geom2} geometry - the geometry to clone
 * @returns {Geom2} new geometry
 * @alias module:modeling/geometries/geom2.clone
 */
export const clone = (geometry) => Object.assign({}, geometry)
