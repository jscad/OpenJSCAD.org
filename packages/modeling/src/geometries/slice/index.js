/**
 * Represents a 3D geometry consisting of a list of contours, where each contour consists of a list of planar vertices.
 * @see {@link slice} for data structure information.
 * @module modeling/geometries/slice
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const slice = geometries.slice.create([[[0,0,0], [4,0,0], [4,3,12]]])
 */
export { calculatePlane } from './calculatePlane.js'
export { create } from './create.js'
export { equals } from './equals.js'
export { fromGeom2 } from './fromGeom2.js'
export { fromVertices } from './fromVertices.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toEdges } from './toEdges.js'
export { toVertices } from './toVertices.js'
export { toPolygons } from './toPolygons.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
