const fromSides = require('./fromSides')
const flip = require('./flip')

const isMirroring = require('../../math/mat4/isMirroring')

function transform (matrix, shape2) {
  let ismirror = isMirroring(matrix)
  let newsides = shape2.sides.map(function (side) {
    return side.transform(matrix)
  })

  return ismirror ? flip(fromSides(newsides)) : fromSides(newsides)
}
module.exports = transform
