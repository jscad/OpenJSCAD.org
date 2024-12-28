/**
 * All shapes (primitives or the results of operations) can be modified to correct issues, etc.
 * In all cases, these functions returns the results, and never changes the original geometry.
 * @module modeling/modifiers
 * @example
 * const { generalize, snap, retessellate } = require('@jscad/modeling').modifiers
 */
module.exports = {
  generalize: require('./generalize'),
  snap: require('./snap'),
  retessellate: require('./retessellate')
}
