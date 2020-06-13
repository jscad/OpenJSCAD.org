const { retessellate } = require('@jscad/modeling')

/**
 * wrapper around internal methods (in case they change) to make sure
 * all geometry resuts in a manifold mesh
 */
const ensureManifoldness = (input) => {
  const transform = (input) => {
    input = 'isRetesselated' in input ? retessellate(input) : input
    // input = 'fixTJunctions' in input ? input.fixTJunctions() : input
    return input
  }

  return Array.isArray(input) ? input.map(transform) : transform(input)
}

module.exports = ensureManifoldness
