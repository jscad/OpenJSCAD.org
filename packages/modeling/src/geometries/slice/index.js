/**
 * Represents a 3D geometry consisting of a list of contours, where each contour consists of a list of planar vertices.
 * @see {@link Slice} for data structure information.
 * @module modeling/slice
 *
 * @example
 * import { slice } from '@jscad/modeling'
 * const slice = slice.create([[[0,0,0], [4,0,0], [4,3,12]]])
 */

/**
 * @typedef Slice
 * @type {Object}
 * @property {Array} contours - list of contours, each contour containing a list of 3D vertices
 *
 * @example
 * // data structure
 * {
 *   contours: [
 *     [[0,0,1], [4,0,1], [4,3,1]]
 *   ]
 * }
 */

export { calculatePlane } from './calculatePlane.js'
export { clone } from './clone.js'
export { create } from './create.js'
export { equals } from './equals.js'
export { fromOutlines } from './fromOutlines.js'
export { fromVertices } from './fromVertices.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toEdges } from './toEdges.js'
export { toVertices } from './toVertices.js'
export { toPolygons } from './toPolygons.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
