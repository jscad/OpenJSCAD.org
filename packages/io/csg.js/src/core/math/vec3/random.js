module.exports = random

const abs = require('./abs')
const fromValues = require('./fromValues')

function random (input) {
  let vec = abs(input)
  if ((vec[0] <= vec[1]) && (vec[0] <= vec[2])) {
    return fromValues(1, 0, 0)
  } else if ((vec[1] <= vec[0]) && (vec[1] <= vec[2])) {
    return fromValues(0, 1, 0)
  } else {
    return fromValues(0, 0, 1)
  }
}
