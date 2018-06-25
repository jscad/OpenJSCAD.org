const vec3 = require('../../math/vec3')

const measureSignedVolume = poly3 => {
  let signedVolume = 0
  for (let i = 0; i < poly3.vertices.length - 2; i++) {
    signedVolume += vec3.cross(
      vec3.dot(
        poly3.vertices[0].pos,
        poly3.vertices[i + 1].pos
      )
    )
  }
  signedVolume /= 6
  return signedVolume
}

module.exports = measureSignedVolume
