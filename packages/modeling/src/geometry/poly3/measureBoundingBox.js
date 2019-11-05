const vec3 = require('../../math/vec3')

// returns an array of two Vector3Ds (minimum coordinates and maximum coordinates)
const measureBoundingBox = (poly3) => {
  const vertices = poly3.vertices
  const numvertices = vertices.length
  let min = numvertices === 0 ? vec3.create() : vec3.clone(vertices[0])
  let max = vec3.clone(min)
  for (let i = 1; i < numvertices; i++) {
    vec3.min(min, min, vertices[i])
    vec3.max(max, max, vertices[i])
  }
  return [min, max]
}

module.exports = measureBoundingBox
