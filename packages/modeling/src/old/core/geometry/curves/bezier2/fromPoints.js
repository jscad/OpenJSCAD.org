const fromPoints = (controlPoints) => {
  // 3 points => quadratic, 4 points, cubic
  return {
    type: 'bezierCurve',
    controlPoints
  }
}

module.exports = fromPoints
