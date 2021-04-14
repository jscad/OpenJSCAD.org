/**
 * Represents a convex 3D polygon consisting of a list of vertices.
 * @see {@link poly3} for data structure information.
 * @module modeling/geometries/poly3
 */
module.exports = {
  clone: require('./clone'),
  create: require('./create'),
  fromPoints: require('./fromPoints'),
  fromPointsAndPlane: require('./fromPointsAndPlane'),
  invert: require('./invert'),
  isA: require('./isA'),
  isConvex: require('./isConvex'),
  measureArea: require('./measureArea'),
  measureBoundingBox: require('./measureBoundingBox'),
  measureBoundingSphere: require('./measureBoundingSphere'),
  measureSignedVolume: require('./measureSignedVolume'),
  plane: require('./plane'),
  toPoints: require('./toPoints'),
  toString: require('./toString'),
  transform: require('./transform')
}
