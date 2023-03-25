import * as mat4 from '../mat4/index.js'

import * as vec2 from '../vec2/index.js'
import * as vec3 from '../vec3/index.js'

/*
 * Class that defines the formula for convertion to/from orthonomal basis vectors.
 * @see https://www.kristakingmath.com/blog/orthonormal-basis-for-a-vector-set
 */
export class OrthonormalFormula {
  /**
   * Construct the standard basis formula from the given plane.
   * @param {plane} the plane of which to convert vertices to/from the orthonormal basis
   */
  constructor (plane) {
    // plane normal is one component
    this.plane = plane
    // orthogonal vector to plane normal is one component
    const rightVector = vec3.orthogonal(vec3.create(), plane)
    this.v = vec3.normalize(rightVector, vec3.cross(rightVector, plane, rightVector))
    // cross between plane normal and orthogonal vector is one component
    this.u = vec3.cross(vec3.create(), this.v, plane)

    this.planeOrigin = vec3.scale(vec3.create(), plane, plane[3])
    this.basisMap = new Map()
  }

  /**
   * Convert the basis formula to a projection matrix.
   * return {mat4} matrix which can be used to convert 3D vertices to 2D points
   */
  getProjectionMatrix () {
    return mat4.fromValues(
      this.u[0], this.v[0], this.plane[0], 0,
      this.u[1], this.v[1], this.plane[1], 0,
      this.u[2], this.v[2], this.plane[2], 0,
      0, 0, -this.plane[3], 1
    )
  }

  /**
   * Convert the basis formula to an inverse projection matrix.
   * return {mat4} matrix which can be used to convert 2D points to 3D vertices
   */
  getInverseProjectionMatrix () {
    return mat4.fromValues(
      this.u[0], this.u[1], this.u[2], 0,
      this.v[0], this.v[1], this.v[2], 0,
      this.plane[0], this.plane[1], this.plane[2], 0,
      this.planeOrigin[0], this.planeOrigin[1], this.planeOrigin[2], 1
    )
  }

  /**
   * Convert the given 3D vertex to a 2D point which exists in the orthonormal basis
   * @param {vec3} - 3D vertex which lies within the original basis (set)
   * @return {vec2} - 2D point which lies within the orthonormal basis
   */
  to2D (vertex) {
    const point = vec2.fromValues(vec3.dot(vertex, this.u), vec3.dot(vertex, this.v))
    this.basisMap.set(point, vertex)
    return point
  }

  /**
   * Convert the given 2D point to a 3D vertex which exists in the original basis (set)
   * @param {vec2} - 2D point which lies within the orthonormal basis
   * @return {vec3} - 3D vertex which lies within the original basis (set)
   */
  to3D (point) {
    // return the original vertex if possible, i.e. no floating point error
    const original = this.basisMap.get(point)
    if (original) return original

    // calculate a new 3D vertex from the orthonormal basis formula
    const v1 = vec3.scale(vec3.create(), this.u, point[0])
    const v2 = vec3.scale(vec3.create(), this.v, point[1])
    const v3 = vec3.add(v1, v1, this.planeOrigin)
    const v4 = vec3.add(v2, v2, v3)
    return v4
  }
}
