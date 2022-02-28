/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * @see {@link geom2} - 2D geometry consisting of sides
 * @see {@link geom3} - 3D geometry consisting of polygons
 * @see {@link path2} - 2D geometry consisting of ordered points
 * @see {@link poly2} - 2D polygon consisting of ordered vertices
 * @see {@link poly3} - 3D polygon consisting of ordered vertices
 *
 * @module modeling/geometries
 * @example
 * const { geom2, geom3, path2, poly2, poly3 } = require('@jscad/modeling').geometries
 */
module.exports = {
  geom2: require('./geom2'),
  geom3: require('./geom3'),
  path2: require('./path2'),
  poly2: require('./poly2'),
  poly3: require('./poly3')
}
