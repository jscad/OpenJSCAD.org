const rotate = require('./rotate')

// returns the vector rotated by 90 degrees clockwise
const normal = (vector) => {
  return rotate((Math.PI / 2), vector)
}

module.exports = normal
