const applyTransforms = require('./applyTransforms')

/**
 * If the transforms matrix is identity returns the original sides.
 * Otherwise produces a new array of sides with transforms applied.
 * NOTE: The sides returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of sides
 * @alias module:modeling/geometries/geom2.toSides
 *
 * @example
 * let sharedsides = toSides(geometry)
 */
const toSides = (geometry) => applyTransforms(geometry).sides

module.exports = toSides
