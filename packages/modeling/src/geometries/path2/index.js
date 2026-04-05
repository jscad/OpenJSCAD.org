/**
 * Represents a 2D geometry consisting of a list of ordered points.
 *
 * @see {@link Path2} for data structure information.
 * @module modeling/path2
 *
 * @example
 * import { path2 } from '@jscad/modeling'
 * let myShape = path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]])
 */

/**
 * @typedef Path2
 * @type {Object}
 * @property {Array} points - list of ordered points
 * @property {boolean} isClosed - true if the path is closed where start and end points are the same
 * @property {Mat4} transforms - transforms to apply to the points, see transform()
 *
 * @example
 * // data structure
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */
export { appendArc } from './appendArc.js'
export { appendBezier } from './appendBezier.js'
export { appendPoints } from './appendPoints.js'
export { clone } from './clone.js'
export { close } from './close.js'
export { concat } from './concat.js'
export { create } from './create.js'
export { equals } from './equals.js'
export { fromPoints } from './fromPoints.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toPoints } from './toPoints.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
