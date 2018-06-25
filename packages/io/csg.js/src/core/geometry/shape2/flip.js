const fromSides = require('./fromSides')

function flip (shape2) {
  let newsides = shape2.sides.map(function (side) {
    return side.flipped()
  }).reverse()
  return fromSides(newsides)
}

module.exports = flip
