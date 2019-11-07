const create = () => {
  return {
    type: 'bezierCurve',
    subType: 'cubic',
    controlPoints: [
      [0, 0],
      [0, 0],
      [0, 0],
      [1, 1]
    ]
  }
}

module.exports = create
