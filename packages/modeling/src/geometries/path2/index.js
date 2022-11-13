/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 *
 * @example
 * colorize([0,0,0,1], path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]]))
 *
 * @example
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0,0,0,1]
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
export { fromCompactBinary } from './fromCompactBinary.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toPoints } from './toPoints.js'
export { toString } from './toString.js'
export { toCompactBinary } from './toCompactBinary.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
