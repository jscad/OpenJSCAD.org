const fromSides = require('./fromSides')

const flip = geom2 => {
  const newsides = geom2.sides.map(side => [side[1], side[0]]).reverse()
  return fromSides(newsides)
}

module.exports = flip
