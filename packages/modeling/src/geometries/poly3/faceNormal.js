const vec3 = require('../../maths/vec3')


/**
 * Calculate normal vector for a face.
 * The normal vector is not always well defined.
 * A polygon may be non-planar. Vertices may be colinear.
 * To handle these cases we compute the average vertex normal.
 */
const faceNormal = (vertices) => {
  const len = vertices.length

  // Calculate normal vector for a single vertex
  // Inline to avoid allocations
  const ba = vec3.create()
  const ca = vec3.create()
  const vertexNormal = (index) => {
    const a = vertices[index]
    const b = vertices[(index + 1) % len]
    const c = vertices[(index + 2) % len]
    vec3.subtract(ba, b, a) // ba = b - a
    vec3.subtract(ca, c, a) // ca = c - a
    vec3.cross(ba, ba, ca) // ba = ba x ca
    vec3.normalize(ba, ba)
    return ba
  }

  if (len === 3) {
    // optimization for triangles, which are always coplanar
    return vertexNormal(0)
  } else {
    // sum of vertex normals
    const normal = vec3.create()
    vertices.forEach((v, i) => {
      vec3.add(normal, normal, vertexNormal(i))
    })
    // renormalize normal vector
    vec3.normalize(normal, normal)
    return normal
  }
}

module.exports = faceNormal
