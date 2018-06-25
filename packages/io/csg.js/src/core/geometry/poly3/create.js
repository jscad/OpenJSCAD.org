/** Class Polygon3
 * Represents a convex polygon. The vertices used to initialize a polygon must
 *   be coplanar and form a convex loop. They do not have to be `Vertex`
 *   instances but they must behave similarly (duck typing can be used for
 *   customization).
 * <br>
 * Each convex polygon has a `shared` property, which is shared between all
 *   polygons that are clones of each other or were split from the same polygon.
 *   This can be used to define per-polygon properties (such as surface color).
 * <br>
 * The plane of the polygon is calculated from the vertex coordinates if not provided.
 *   The plane can alternatively be passed as the third argument to avoid calculations.
 *
 * @constructor
 * @param {Vertex[]} vertices - list of vertices
 * @param {Polygon3.Shared} [shared=defaultShared] - shared property to apply
 * @param {Plane} [plane] - plane of the polygon
 *
 * @example
 * const vertices = [
 *   new CSG.Vertex(new CSG.Vector3D([0, 0, 0])),
 *   new CSG.Vertex(new CSG.Vector3D([0, 10, 0])),
 *   new CSG.Vertex(new CSG.Vector3D([0, 10, 10]))
 * ]
 * let observed = new Polygon3(vertices)
 */
/*let Polygon3 = function (vertices, shared, plane) {
  this.vertices = vertices
  if (!shared) shared = Polygon3.defaultShared
  this.shared = shared
    // let numvertices = vertices.length;

  if (arguments.length >= 3) {
    this.plane = plane
  } else {
    const Plane = require('./Plane') // FIXME: circular dependencies ???
    this.plane = Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos)
  }

  if (_CSGDEBUG) {
    if (!this.checkIfConvex()) {
      throw new Error('Not convex!')
    }
  }
}*/

/**
 * Creates a new, empty poly3 (polygon3)
 *
 * @returns {poly3} a new 3D polygon
 */
function create () {
  return {
    vertices: [],
    shared: {
      color: undefined,
      getTag: function () {
        let result = this.tag
        if (!result) {
          result = getTag()
          this.tag = result
        }
        return result
      }
    },
    plane: [0, 0, 0, 1] // FIXME: use plane structure, vec4, plane class?
  }
  /* if (!shared) shared = Polygon3.defaultShared
  this.shared = shared

  if (arguments.length >= 3) {
    this.plane = plane
  } else {
    const Plane = require('./Plane') // FIXME: circular dependencies ???
    this.plane = Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos)
  }

  if (_CSGDEBUG) {
    if (!this.checkIfConvex()) {
      throw new Error('Not convex!')
    }
  } */
}

module.exports = create
