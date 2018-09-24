const fromValues = require('./fromValues')

const fromAngleDegrees = (degrees) => {
  const radians = Math.PI * degrees / 180
  return fromValues(Math.cos(radians), Math.sin(radians))
}

module.exports = fromAngleDegrees
