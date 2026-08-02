/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 *
 * Each outline is always closed between the first and last points.
 *
 * @see {@link Geom2} for data structure information.
 * @module modeling/geom2
 *
 * @example
 * import { geom2 } from '@jscad/modeling'
 * let myShape = geom2.create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */

export { clone } from './clone.js'
export { create } from './create.js'
export { fromPoints } from './fromPoints.js'
export { fromSides } from './fromSides.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toOutlines } from './toOutlines.js'
export { toPoints } from './toPoints.js'
export { toSides } from './toSides.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
