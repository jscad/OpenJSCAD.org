const applyTransforms = require('./applyTransforms')

/**
 * Produces an array of sides from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of sides
 * @alias module:modeling/geometry/geom2.toSides
 *
 * @example
 * let sharedsides = toSides(geometry)
 */
const toSides = function (geometry) {
  return applyTransforms(geometry).sides
}

module.exports = toSides
