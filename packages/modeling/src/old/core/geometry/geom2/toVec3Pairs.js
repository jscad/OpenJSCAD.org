const vec3 = require('../../math/vec3')

const toVec3Pairs = (geometry, matrix) => {
  // convert start,end points of sides to 3d points
  let pairs = geometry.sides.map(side => {
    let p0 = side[0]
    let p1 = side[1]
    return [vec3.fromVec2(p0), vec3.fromVec2(p1)]
  })
  if (typeof matrix !== 'undefined') {
    // transform each point by the matrix
    pairs = pairs.map(pair => pair.map(v => vec3.transform(matrix, v)))
  }
  return pairs
}

module.exports = toVec3Pairs
