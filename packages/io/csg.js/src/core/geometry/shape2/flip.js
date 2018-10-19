const fromSides = require('./fromSides')

const flip = shape2 => {
  const newsides = shape2.sides.map(side => [side[1], side[0]]).reverse()
  return fromSides(newsides)
}

module.exports = flip
