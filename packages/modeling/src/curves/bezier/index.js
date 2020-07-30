/**
 * Represents a bezier easing function.
 * @see {@link bezier} for data structure information.
 * @module modeling/curves/bezier
 */
module.exports = {
  create: require('./create'),
  valueAt: require('./valueAt'),
  tangentAt: require('./tangentAt')
}
