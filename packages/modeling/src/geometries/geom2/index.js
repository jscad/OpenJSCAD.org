/**
 * Represents a 2D geometry consisting of a outlines, where each outline is an ordered list of points.
 * The outline is always closed between the first and last points.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 *
 * @example
 * colorize([0.5,0,1,1], square()) // purple square
 *
 * @example
 * {
 *   "outlines": [[[-1,-1],[1,-1],[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0.5,0,1,1]
 * }
 */
export { clone } from './clone.js'
export { create } from './create.js'
export { fromPoints } from './fromPoints.js'
export { fromSides } from './fromSides.js'
export { fromCompactBinary } from './fromCompactBinary.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toOutlines } from './toOutlines.js'
export { toPoints } from './toPoints.js'
export { toSides } from './toSides.js'
export { toString } from './toString.js'
export { toCompactBinary } from './toCompactBinary.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
