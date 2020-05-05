/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometry/geom3
 */
module.exports = {
  clone: require('./clone'),
  create: require('./create'),
  equals: require('./equals'),
  fromPoints: require('./fromPoints'),
  fromCompactBinary: require('./fromCompactBinary'),
  isA: require('./isA'),
  toPoints: require('./toPoints'),
  toPolygons: require('./toPolygons'),
  toString: require('./toString'),
  toCompactBinary: require('./toCompactBinary'),
  transform: require('./transform')
}
