/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are consider immutable, so never change the contents directly.
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
