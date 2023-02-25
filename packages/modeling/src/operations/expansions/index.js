/**
 * All shapes (primitives or the results of operations) can be expanded (or contracted.)
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/expansions
 * @example
 * import { expansions } from '@jscad/modeling'
 * const { expand, offset } = expansions'
 */
export { expand } from './expand.js'
export { offset } from './offset.js'
