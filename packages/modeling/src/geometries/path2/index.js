/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 *
 * @example
 * colorize([0,0,0,1], path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]]))
 *
 * @example
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0,0,0,1]
 * }
 */
module.exports = {
  appendArc: require('./appendArc'),
  appendBezier: require('./appendBezier'),
  appendPoints: require('./appendPoints'),
  clone: require('./clone'),
  close: require('./close'),
  concat: require('./concat'),
  create: require('./create'),
  equals: require('./equals'),
  fromPoints: require('./fromPoints'),
  fromCompactBinary: require('./fromCompactBinary'),
  isA: require('./isA'),
  reverse: require('./reverse'),
  toPoints: require('./toPoints'),
  toString: require('./toString'),
  toCompactBinary: require('./toCompactBinary'),
  transform: require('./transform'),
  validate: require('./validate')
}
