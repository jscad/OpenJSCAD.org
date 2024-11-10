const mat4 = require('./mat4')

const vec2 = require('./vec2')
const vec3 = require('./vec3')

/*
 * Class OrthoNormalBasis
 * Reprojects points on a 3D plane onto a 2D plane
 * or from a 2D plane back onto the 3D plane
 * @param  {plane} plane
 * @param  {vec3} rightvector
 */
const OrthoNormalBasis = function (plane, rightvector) {
  if (arguments.length < 2) {
    // choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal:
    rightvector = vec3.orthogonal(vec3.create(), plane)
  }
  this.v = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), plane, rightvector))
  this.u = vec3.cross(vec3.create(), this.v, plane)
  this.plane = plane
  this.planeorigin = vec3.scale(vec3.create(), plane, plane[3])
}

OrthoNormalBasis.prototype = {

  getProjectionMatrix: function () {
    return mat4.fromValues(
      this.u[0], this.v[0], this.plane[0], 0,
      this.u[1], this.v[1], this.plane[1], 0,
      this.u[2], this.v[2], this.plane[2], 0,
      0, 0, -this.plane[3], 1
    )
  },

  getInverseProjectionMatrix: function () {
    const p = vec3.scale(vec3.create(), this.plane, this.plane[3])
    return mat4.fromValues(
      this.u[0], this.u[1], this.u[2], 0,
      this.v[0], this.v[1], this.v[2], 0,
      this.plane[0], this.plane[1], this.plane[2], 0,
      p[0], p[1], p[2], 1
    )
  },

  to2D: function (point) {
    return vec2.fromValues(vec3.dot(point, this.u), vec3.dot(point, this.v))
  },

  to3D: function (point) {
    const v1 = vec3.scale(vec3.create(), this.u, point[0])
    const v2 = vec3.scale(vec3.create(), this.v, point[1])

    const v3 = vec3.add(v1, v1, this.planeorigin)
    const v4 = vec3.add(v2, v2, v3)
    return v4
  }
}

module.exports = OrthoNormalBasis
