/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 *
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * @see [Geom2]{@link module:modeling/geom2} - 2D geometry consisting of 2D outlines
 * @see [Geom3]{@link module:modeling/geom3} - 3D geometry consisting of polygons
 * @see [Path2]{@link module:modeling/path2} - 2D geometry consisting of ordered 2D points
 * @see [Path3]{@link module:modeling/path3} - 3D geometry consisting of ordered 3D vertices
 * @see [Poly2]{@link module:modeling/poly2} - 2D polygon consisting of 2D points
 * @see [Poly3]{@link module:modeling/poly3} - 3D polygon consisting of 3D vertices
 * @see [Slice]{@link module:modeling/slice} - 3D geometry consisting of 3D contours
 * @alias module:modeling.geometry
 *
 * @example
 * import { geom2, geom3, path2, poly2, poly3, slice } from '@jscad/modeling'
 */
export * as geom2 from './geom2/index.js'
export * as geom3 from './geom3/index.js'
export * as path2 from './path2/index.js'
export * as path3 from './path3/index.js'
export * as poly2 from './poly2/index.js'
export * as poly3 from './poly3/index.js'
export * as slice from './slice/index.js'
