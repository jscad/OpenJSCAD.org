/**
 * @module modeling/curves/bezier
 */

/**
 * Represents a bezier easing function.
 *
 * @example
 * const b = bezier.create([0,10]) // a linear progression from 0 to 10
 * const b = bezier.create([0, 0, 10, 10]) // a symmetrical cubic easing curve that starts slowly and ends slowly from 0 to 10
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * Usage:
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 * let tangent = bezier.tangentAt(t,b) // where 0 < t < 1
 *
 * @typedef {Object} bezier
 */
module.exports = {
  create: require('./create'),
  valueAt: require('./valueAt'),
  tangentAt: require('./tangentAt')
}
