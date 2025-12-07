/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometries/geom3
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const myShape = geometries.geom3.fromVertices([
 *   [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]],
 *   [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]],
 *   [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]
 *   [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]],
 *   [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]],
 *   [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]
 * ])
 */
export { clone } from './clone.js'
export { create } from './create.js'
export { fromVertices } from './fromVertices.js'
export { fromVerticesConvex } from './fromVerticesConvex.js'
export { invert } from './invert.js'
export { isA } from './isA.js'
export { toPolygons } from './toPolygons.js'
export { toString } from './toString.js'
export { toVertices } from './toVertices.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
