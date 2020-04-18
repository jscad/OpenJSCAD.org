const plane = require('../../math/plane/')

/**
 * Represents a convex polygon. The vertices used to initialize a polygon must
 *   be coplanar and form a convex loop. They do not have to be `vec3`
 *   instances but they must behave similarly.
 *
 * Each convex polygon has a `shared` property, which is shared between all
 *   polygons that are clones of each other or were split from the same polygon.
 *   This can be used to define per-polygon properties (such as surface color).
 * 
 * The plane of the polygon is calculated from the vertex coordinates if not provided.
 *   The plane can alternatively be passed as the third argument to avoid calculations.
 *
 * @constructor
 * @param {vec3[]} vertices - list of vertices
 * @param {shared} [shared=defaultShared] - shared property to apply
 * @param {plane} [plane] - plane of the polygon
 *
 * @example
 * const vertices = [ [0, 0, 0], [0, 10, 0], [0, 10, 10] ]
 * let observed = poly3.fromPoints(vertices)
 */

/**
 * Creates a new poly3 (polygon) with initial values
 *
 * @returns {poly3} a new poly3
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
