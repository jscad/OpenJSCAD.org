const vec3 = require('../../math/vec3')

// NOTE: This is totally worthless. The volume of a planar polygon is always zero(0).
const measureSignedVolume = (poly3) => {
  let signedVolume = 0
  const vertices = poly3.vertices
  for (let i = 0; i < vertices.length - 2; i++) {
    const cross = vec3.cross(vertices[i + 1], vertices[i + 2])
    signedVolume += vec3.dot(vertices[0], cross)
  }
  signedVolume /= 6
  return signedVolume
}

module.exports = measureSignedVolume
