/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometries/geom3
 *
 * @example
 * colorize([0,0.5,1,0.6], cube()) // transparent ice cube
 *
 * @example
 * {
 *   "polygons": [
 *     {"vertices": [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]]},
 *     {"vertices": [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]]},
 *     {"vertices": [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]},
 *     {"vertices": [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]]},
 *     {"vertices": [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]]},
 *     {"vertices": [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]}
 *   ],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0,0.5,1,0.6]
 * }
 */
module.exports = {
  clone: require('./clone'),
  create: require('./create'),
  fromPointsConvex: require('./fromPointsConvex'),
  fromPoints: require('./fromPoints'),
  fromCompactBinary: require('./fromCompactBinary'),
  invert: require('./invert'),
  isA: require('./isA'),
  toPoints: require('./toPoints'),
  toPolygons: require('./toPolygons'),
  toString: require('./toString'),
  toCompactBinary: require('./toCompactBinary'),
  transform: require('./transform'),
  validate: require('./validate')
}
