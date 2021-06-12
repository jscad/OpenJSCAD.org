/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 */
module.exports = {
  appendArc: require('./appendArc'),
  appendBezier: require('./appendBezier'),
  appendPoints: require('./appendPoints'),
  clone: require('./clone'),
  close: require('./close'),
  concat: require('./concat'),
  create: require('./create'),
  eachPoint: require('./eachPoint'),
  equals: require('./equals'),
  fromPoints: require('./fromPoints'),
  fromCompactBinary: require('./fromCompactBinary'),
  isA: require('./isA'),
  reverse: require('./reverse'),
  toPoints: require('./toPoints'),
  toString: require('./toString'),
  toCompactBinary: require('./toCompactBinary'),
  transform: require('./transform')
}
