const plane = require('../../math/plane/')

/**
 * Represents a convex 3D polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex shape. The vertices do not have to be `vec3`
 * instances but they must behave similarly.
 * @typedef {Object} poly3
 * @property {Array} vertices - list of ordered vertices (3D)
 * @property {plane} polyplane - plane of the polygon in 3D space
 */

/**
 * Creates a new 3D polygon with initial values.
 * The plane of the polygon is calculated from the given vertices if provided.
 *
 * @param {Array} [vertices] - a list of vertices (3D)
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometry/poly3.create
 */
const create = (vertices) => {
  // FIXME is plane really necessary? only for boolean ops?
  let polyplane
  if (vertices === undefined || vertices.length < 3) {
    vertices = [] // empty contents
    polyplane = plane.create()
  } else {
    polyplane = plane.fromPoints(vertices[0], vertices[1], vertices[2])
  }
  return {
    vertices: vertices,
    plane: polyplane
  }
}

module.exports = create
