
// Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
// Returns a new Vector3D
const transform =  (matrix, vec3) => {
  return matrix4x4.leftMultiply1x3Vector(this)
}

module.exports = transform
