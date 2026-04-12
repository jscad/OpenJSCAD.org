/**
 * Performs a shallow clone of the given geometry.
 *
 * @param {Geom2} geometry - the geometry to clone
 * @returns {Geom2} new geometry
 * @alias module:modeling/geom2.clone
 *
 * @example
 * const geometry = geom2.clone(geometry)
 */
export const clone = (geometry) => Object.assign({}, geometry)
