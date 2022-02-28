/**
 * Represents a 2D polygon consisting of a list of ordered vertices.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * poly2.create([[0,0], [4,0], [4,3]])
 *
 * @example
 * {"vertices": [[0,0], [4,0], [4,3]]}
 */
module.exports = {
  arePointsInside: require('./arePointsInside'),
  create: require('./create'),
  flip: require('./flip'),
  measureArea: require('./measureArea')
}
