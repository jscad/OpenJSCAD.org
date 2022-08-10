/**
 * Represents a 3D geometry consisting of a list of edges.
 * @see {@link slice} for data structure information.
 * @module modeling/extrusions/slice
 */
module.exports = {
  calculatePlane: require('./calculatePlane'),
  clone: require('./clone'),
  create: require('./create'),
  equals: require('./equals'),
  fromPoints: require('./fromPoints'),
  fromSides: require('./fromSides'),
  isA: require('./isA'),
  reverse: require('./reverse'),
  toEdges: require('./toEdges'),
  toPolygons: require('./toPolygons'),
  toString: require('./toString'),
  transform: require('./transform')
}
