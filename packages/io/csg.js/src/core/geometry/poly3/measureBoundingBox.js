const vec3 = require('../../math/vec3')

// FIXME: MUTATES THE INPUT DATA !!!!
// returns an array of two Vector3Ds (minimum coordinates and maximum coordinates)
const measureBoundingBox = poly3 => {
  if (!poly3.cachedBoundingBox) {
    let minpoint, maxpoint
    let vertices = poly3.vertices
    let numvertices = vertices.length
    minpoint = numvertices === 0 ? vec3.create() : vertices[0].pos
    maxpoint = minpoint
    for (let i = 1; i < numvertices; i++) {
      const point = vertices[i].pos
      minpoint = vec3.min(minpoint, point)
      maxpoint = vec3.max(maxpoint, point)
    }
    poly3.cachedBoundingBox = [minpoint, maxpoint]
  }
  return poly3.cachedBoundingBox
}

module.exports = measureBoundingBox
