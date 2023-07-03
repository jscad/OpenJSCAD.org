/**
 * Represents a 2D polygon consisting of a list of ordered points.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const p1 = geometries.poly2.create([[0,0], [4,0], [4,3]])
 */
export { arePointsInside } from './arePointsInside.js'
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
