module.exports = randomNonParallel

const normalize = require('./normalize')
const fromValues = require('./fromValues')

function randomNonParallel (input) {
  let abs = normalize(input)
  if ((abs[0] <= abs[1]) && (abs[0] <= abs[2])) {
    return fromValues(1, 0, 0)
  } else if ((abs[1] <= abs[0]) && (abs[1] <= abs[2])) {
    return fromValues(0, 1, 0)
  } else {
    return fromValues(0, 0, 1)
  }
}
