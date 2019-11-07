const fromValues = require('./fromValues')

const fromAngleRadians = (radians) => {
  return fromValues(Math.cos(radians), Math.sin(radians))
}

module.exports = fromAngleRadians
