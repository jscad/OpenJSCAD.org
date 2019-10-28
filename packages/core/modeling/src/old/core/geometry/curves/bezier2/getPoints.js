const getPointAt = require('./getPointAt')

const getPoints = (steps, resolution, curve) => {
  const points = []
  for (let d = 0; d <= steps; d++) {
    points.push(getPointAt(d / steps, curve))
  }
  return points
}

module.exports = getPoints
