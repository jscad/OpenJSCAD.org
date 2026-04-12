/**
 * Performs a shallow clone of the given geometry.
 *
 * @param {Geom3} geometry - the geometry to clone
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.clone
 *
 * @example
 * let clone = geom3.clone(geometry)
 */
export const clone = (geometry) => Object.assign({}, geometry)
