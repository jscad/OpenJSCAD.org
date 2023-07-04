/**
 * All shapes (primitives or the results of operations) can be modified to correct issues, etc.
 * In all cases, these functions returns the results, and never changes the original geometry.
 * @module modeling/modifiers
 * @example
 * import { generalize, snap } from '@jscad/modeling/modifiers'
 */
export { generalize } from './generalize.js'
export { snap } from './snap.js'
export { retessellate } from './retessellate.js'
