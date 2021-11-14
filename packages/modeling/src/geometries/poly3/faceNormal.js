const vec3 = require('../../maths/vec3')

/**
 * Calculate normal vector for a single vertex.
 */
const vertexNormal = (vertices, index) => {
  const a = vertices[index]
  const b = vertices[(index + 1) % vertices.length]
  const c = vertices[(index + 2) % vertices.length]
  const ba = vec3.subtract(vec3.create(), b, a)
  const ca = vec3.subtract(vec3.create(), c, a)
  vec3.cross(ba, ba, ca)
  vec3.normalize(ba, ba)
  return ba
}

/**
 * Calculate normal vector for a face.
 * The normal vector is not always well defined.
 * A polygon may be non-planar. Vertices may be colinear.
 * To handle these cases we compute the average of the vertex normals.
 */
const faceNormal = (vertices) => {
  if (vertices.length === 3) {
    // optimization for triangles, which are always coplanar
    return vertexNormal(vertices, 1)
  } else {
    // average of vertex normals
    const normal = vec3.create()
    vertices.forEach((v, i) => {
      vec3.add(normal, normal, vertexNormal(vertices, i))
    })
    // renormalize normal vector
    vec3.normalize(normal, normal)
    return normal
  }
}

module.exports = faceNormal
