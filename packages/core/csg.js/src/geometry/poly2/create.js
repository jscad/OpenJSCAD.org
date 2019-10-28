const plane = require('../../math/plane/')

/**
 * Creates a new poly2 (polygon) with initial values.
 *
 * @param {Array[]} [vertices] - list of vertices
 * @returns {poly2} a new poly2
 * @example
 * let polygon = create()
 */
const create = (vertices) => {
  if (vertices === undefined || vertices.length < 3) {
    vertices = [] // empty contents
  }
  return { vertices: vertices }
}

module.exports = create
