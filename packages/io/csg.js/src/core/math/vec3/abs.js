const fromValues = require('./fromValues')

const abs = (input) => {
  return fromValues(Math.abs(input[0]), Math.abs(input[1]), Math.abs(input[2]))
}

module.exports = abs
