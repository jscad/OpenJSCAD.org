/**
 * Represents a 2D polygon consisting of a list of ordered points.
 * @see {@link Poly2} for data structure information.
 * @module modeling/poly2
 *
 * @example
 * import { poly2 } from '@jscad/modeling'
 * const p1 = poly2.create([[0,0], [4,0], [4,3]])
 */

/**
 * @typedef {Object} Poly2
 * @property {Array} points - list of ordered points (2D)
 *
 * @example
 * // data structure
 * {
 *   points: [[0,0], [4,0], [4,3]],
 * }
 */

export { arePointsInside } from './arePointsInside.js'
export { clone } from './clone.js'
export { create } from './create.js'
export { isA } from './isA.js'
export { isConvex } from './isConvex.js'
export { isSimple } from './isSimple.js'
export { measureArea } from './measureArea.js'
export { measureBoundingBox } from './measureBoundingBox.js'
export { reverse } from './reverse.js'
export { toPoints } from './toPoints.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
