const create = require('./create')

const plane = require('../../math/plane/')
const vec3 = require('../../math/vec3')

/**
 * Create a deep clone of the given polygon
 *
 * @param {vec3} [out] - receiving polygon
 * @param {vec3} poly3 - polygon to clone
 * @returns {vec3} clone of the polygon
 */
const clone = (...params) => {
  let out
  let poly3
  if (params.length === 1) {
    out = create()
    poly3 = params[0]
  } else {
    out = params[0]
    poly3 = params[1]
  }
  // deep clone of vertices
  out.vertices = poly3.vertices.map((vec) => { return vec3.clone(vec) })
  // deep clone of plane
  out.plane = plane.clone(poly3.plane)
  return out
}

module.exports = clone
