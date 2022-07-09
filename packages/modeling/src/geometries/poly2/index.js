/**
 * Represents a 2D polygon consisting of a list of ordered vertices.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * const p0 = poly2.create()
 * const p1 = poly2.create([[0,0], [4,0], [4,3]])
 */
module.exports = {
  arePointsInside: require('./arePointsInside'),
  clone: require('./clone'),
  create: require('./create'),
  isA: require('./isA'),
  isConvex: require('./isConvex'),
  measureArea: require('./measureArea'),
  reverse: require('./reverse'),
  toPoints: require('./toPoints'),
  toString: require('./toString'),
  transform: require('./transform'),
  validate: require('./validate')
}
