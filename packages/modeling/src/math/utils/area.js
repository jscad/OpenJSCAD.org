/*
 * Calculate the area under the given points
 */
const area = (points) => {
  let area = 0
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    area += points[i][0] * points[j][1]
    area -= points[j][0] * points[i][1]
  }
  return (area / 2.0)
}

module.exports = area
