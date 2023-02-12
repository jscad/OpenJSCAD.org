/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * @see {@link geom2} - 2D geometry consisting of outlines
 * @see {@link geom3} - 3D geometry consisting of polygons
 * @see {@link path2} - 2D geometry consisting of ordered points
 * @see {@link poly2} - 2D polygon consisting of ordered vertices
 * @see {@link poly3} - 3D polygon consisting of ordered vertices
 *
 * @module modeling/geometries
 * @example
 * const { geom2, geom3, path2, poly2, poly3 } = require('@jscad/modeling').geometries
 */
export * as geom2 from './geom2/index.js'
export * as geom3 from './geom3/index.js'
export * as path2 from './path2/index.js'
export * as poly2 from './poly2/index.js'
export * as poly3 from './poly3/index.js'
export * as slice from './slice/index.js'
