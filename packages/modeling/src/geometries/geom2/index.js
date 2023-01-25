/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * The outline is always closed between the first and last points.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * let myShape = geometries.geom2.create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
export { create } from './create.js'
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
