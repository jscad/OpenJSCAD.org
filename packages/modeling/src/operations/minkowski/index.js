/**
 * Minkowski sum operations for 3D geometries.
 *
 * The Minkowski sum of two shapes A and B is the set of all points that are
 * the sum of a point in A and a point in B. This is useful for:
 * - Offsetting/inflating shapes (using a sphere creates rounded edges)
 * - Collision detection (shapes collide iff their Minkowski difference contains origin)
 * - Motion planning and swept volumes
 *
 * @module modeling/operations/minkowski
 * @example
 * const { minkowski } = require('@jscad/modeling').operations
 * const rounded = minkowski.minkowskiSum(cube, sphere)
 */
module.exports = {
  minkowskiSum: require('./minkowskiSum')
}
