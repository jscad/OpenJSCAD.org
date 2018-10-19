const { min, create, max } = require('../../math/vec2')

const getBounds = shape => {
  let minPoint = shape.sides.length === 0 ? create() : [shape.sides[0][0][0], shape.sides[0][0][1]]
  let maxPoint = minPoint
  shape.sides.forEach(side => {
    minPoint = min(minPoint, side[0])
    minPoint = min(minPoint, side[1])
    maxPoint = max(maxPoint, side[0])
    maxPoint = max(maxPoint, side[1])
  })
  return [minPoint, maxPoint]
}

module.exports = getBounds
