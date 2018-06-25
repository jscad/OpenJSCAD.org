const fromAngleRadians = radians => {
  let out = new Float32Array(3)
  out[0] = Math.cos(radians)
  out[1] = Math.sin(radians)
  return out
}

module.exports = fromAngleRadians
