const fromValues = require('./fromValues')

const abs = (input) => {
  return fromValues(Math.abs(input[0]), Math.abs(input[1]))
}

module.exports = abs
