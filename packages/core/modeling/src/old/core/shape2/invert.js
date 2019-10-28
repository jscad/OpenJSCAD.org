const clone = require('./clone')

/** negate a shape : ie set it to negative, so that any union operation with this shape
 * would be the same as a difference
 * @typedef {import('./create').Shape2} Shape2
 * @param  {Shape2} shape the original shape
 * @returns {Shape2} the negated shape
 */
const invert = shape => {
  const cloned = clone(shape)
  cloned.isNegative = !cloned.isNegative
  return cloned
}

module.exports = invert
