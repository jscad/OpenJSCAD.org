/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * ## geom2
 * Represents a 2D geometry consisting of a list of sides.
 *
 * ```js
 * colorize([0.5,0,1,1], square()) // purple square
 * ```
 *
 * ```json
 * {
 *   "sides": [[[-1,1],[-1,-1]],[[-1,-1],[1,-1]],[[1,-1],[1,1]],[[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0.5,0,1,1]
 * }
 * ```
 *
 * ## geom3
 * Represents a 3D geometry consisting of a list of polygons.
 *
 * ```js
 * colorize([0.5,0,1,0.4], cube()) // transparent cube
 * ````
 *
 * ```json
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
 *   "color": [0.5,0,1,0.4]
 * }
 * ```
 *
 * ## path2
 * Represents a 2D geometry consisting of a list of ordered points.
 *
 * ```js
 * colorize([0.5,0,1,1], path2.fromPoints({closed: true}, [[0,0], [4,0], [4,3]]))
 * ````
 *
 * ```json
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0.5,0,1,1]
 * }
 * ```
 *
 * ## poly2
 * Represents a 2D polygon consisting of a list of ordered vertices.
 *
 * ```js
 * poly2.create([[0,0], [4,0], [4,3]])
 * ```
 *
 * ```json
 * {
 *   "vertices": [[0,0], [4,0], [4,3]]
 * }
 * ```
 *
 * ## poly3
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 *
 * ```js
 * poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 * ```
 *
 * ```json
 * {
 *   "vertices": [[0,0,0], [4,0,0], [4,3,12]]
 * }
 * ```
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
