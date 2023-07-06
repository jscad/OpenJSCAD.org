/**
 * All shapes (primitives or the results of operations) can be expanded (or contracted.)
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/expansions
 * @example
 * import { expansions } from '@jscad/modeling'
 * const { expand, offset } = expansions'
 */
export { offset } from './offset.js'
export { offsetFromPoints } from './offsetFromPoints.js'
