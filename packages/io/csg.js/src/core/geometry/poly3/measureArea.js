const vec3 = require('../../math/vec3')

// Note: could calculate vectors only once to speed up
// FIXME: use a pipe operator to simplify vec3 operations
const measureArea = (poly3) => {
  let polygonArea = 0
  for (let i = 0; i < poly3.vertices.length - 2; i++) {
    polygonArea += vec3.length(
        vec3.cross(
          vec3.subtract(poly3.vertices[i + 1].pos, poly3.vertices[0].pos),
          vec3.subtract(poly3.vertices[i + 2].pos, poly3.vertices[i + 1].pos)
      )
    )
  }
  polygonArea *= 0.5
  return polygonArea
}

module.exports = measureArea
