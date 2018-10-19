const lengthSquared = require('./lengthSquared')

const length = side => {
  return Math.sqrt(lengthSquared(side))
}

module.exports = length
