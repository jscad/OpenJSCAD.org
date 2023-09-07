/**
 * All shapes (primitives or the results of operations) can be passed to hull functions
 * to determine the convex hull of all points.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/hulls
 * @example
 * import { hull, hullChain } from '@jscad/modeling'
 */
export { hull } from './hull.js'
export { hullChain } from './hullChain.js'
