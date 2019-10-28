/**
 * Creates a new empty slice.
 *
 * @returns {slice} a new slice
 */
const create = (edges) => {
  if (!edges) {
    edges = []
  }
  return { edges }
}

module.exports = create
