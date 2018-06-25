// extend to a 3D vector by adding a z coordinate:
const fromVector2 = (vector2, z = 0) => {
  let out = new Float32Array(3)
  out[0] = vector2[0]
  out[1] = vector2[1]
  out[2] = z
  return out
}

module.exports = fromVector2
