module.exports = normal
// returns the vector rotated by 90 degrees clockwise
function normal (vector) {
  let out = new Float32Array(2)
  out[0] = vector[1]
  out[1] = -vector[0]
  return out
}
