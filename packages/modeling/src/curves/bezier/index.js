/**
 * Represents a bezier easing function.
 * @see {@link bezier} for data structure information.
 * @module modeling/curves/bezier
 * @example
 * import { curves } from '@jscad/modeling'
 * const { bezier } = curves
 */
export { create } from './create.js'
export { valueAt } from './valueAt.js'
export { tangentAt } from './tangentAt.js'
export { lengths } from './lengths.js'
export { length } from './length.js'
export { arcLengthToT } from './arcLengthToT.js'
