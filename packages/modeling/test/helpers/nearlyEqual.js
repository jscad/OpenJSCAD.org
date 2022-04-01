// Compare two numeric values for near equality.
// the given test is fails if the numeric values are outside the given epsilon
const nearlyEqual = (t, a, b, epsilon, failMessage) => {
  if (typeof t !== 'object') {
    throw new Error('first argument must be a test object')
  }
  if (a === b) { // shortcut, also handles infinities
    return true
  }

  const absA = Math.abs(a)
  const absB = Math.abs(b)
  const diff = Math.abs(a - b)
  if (Number.isNaN(diff)) {
    failMessage = failMessage === undefined ? 'difference is not a number' : failMessage
    t.fail(failMessage + '(' + a + ',' + b + ')')
  }
  if (a === 0 || b === 0 || diff < Number.EPSILON) {
  // a or b is zero or both are extremely close to it
  // relative error is less meaningful here
    if (diff > (epsilon * Number.EPSILON)) {
      failMessage = failMessage === undefined ? 'near zero Numbers outside of epsilon' : failMessage
      t.fail(failMessage + '(' + a + ',' + b + ')')
    }
  }
  // use relative error
  const relative = (diff / Math.min((absA + absB), Number.MAX_VALUE))
  if (relative > epsilon) {
    failMessage = failMessage === undefined ? 'Numbers outside of epsilon' : failMessage
    t.fail(failMessage + '(' + a + ',' + b + ')')
  }
}

module.exports = nearlyEqual
