/**
 * wrapper around internal csg methods (in case they change) to make sure
 * it resuts in a manifold mesh
 * @constructor
 * @param {string} title - The title of the book.
 * @return {csg}
 */
function ensureManifoldness (input) {
  const transform = input => {
    input = 'reTesselated' in input ? input.reTesselated() : input
    input = 'fixTJunctions' in input ? input.fixTJunctions() : input // fixTJunctions also calls this.canonicalized() so no need to do it twice
    return input
  }

  return input.constructor !== Array ? transform(input) : input.map(transform)
}

module.exports = ensureManifoldness
