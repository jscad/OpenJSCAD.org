const clone = require('./clone')

/** negate a shape : ie set it to negative, so that any union operation with this shape
 * would be the same as a difference
 * @param  {Shape2} shape the original shape
 * @returns {Shape2} the negated shape
 */
const negate = shape => {
  const cloned = clone(shape)
  cloned.isNegative = true
  return cloned
}

module.exports = negate
