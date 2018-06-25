module.exports = abs
const fromValues = require('./fromValues')

function abs (input) {
  return fromValues(Math.abs(input[0]), Math.abs(input[1]), Math.abs(input[2]))
}
