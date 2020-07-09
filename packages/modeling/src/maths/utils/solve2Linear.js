const solve2Linear = (a, b, c, d, u, v) => {
  const det = a * d - b * c
  const invdet = 1.0 / det
  let x = u * d - b * v
  let y = -u * c + a * v
  x *= invdet
  y *= invdet
  return [x, y]
}

module.exports = solve2Linear
