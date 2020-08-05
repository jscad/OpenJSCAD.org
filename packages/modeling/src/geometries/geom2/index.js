/**
 * Represents a 2D geometry consisting of a list of sides.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 */
module.exports = {
  clone: require('./clone'),
  create: require('./create'),
  fromPoints: require('./fromPoints'),
  fromCompactBinary: require('./fromCompactBinary'),
  isA: require('./isA'),
  reverse: require('./reverse'),
  toOutlines: require('./toOutlines'),
  toPoints: require('./toPoints'),
  toSides: require('./toSides'),
  toString: require('./toString'),
  toCompactBinary: require('./toCompactBinary'),
  transform: require('./transform')
}
