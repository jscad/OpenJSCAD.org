const geom3 = require('../geometry/geom3')
const clone = require('./clone')

/** TODO: same as  negate() ?
 * Return a new Shape3 solid with solid and empty space switched.
 * This solid is not modified.
 * @returns {Shape3} new Shape3 object
 * @example
 * const B = invert(A)
 */
const invert = shape => {
  const newShape = clone(shape)
  newShape.isNegative = !shape.isNegative
  // FIXME: multiple ways to do this: should the geometry be inverted ? or we just use the flag + special handling 
  // in the boolean operations
  newShape.geometry = geom3.invert(shape.geometry)
  return newShape
}

module.exports = invert
