/**
 * Represents a 2D polygon consisting of a list of ordered vertices.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 */
module.exports = {
  arePointsInside: require('./arePointsInside'),
  create: require('./create'),
  flip: require('./flip'),
  measureArea: require('./measureArea')
}
