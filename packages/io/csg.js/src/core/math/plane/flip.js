module.exports = flip
const fromValues = require('../vec4/fromValues')

/**
 * Flip the given plane
 * @return {Array} a new plane with properly typed values
 */
function flip (a) {
  return fromValues(-a[0], -a[1], -a[2], -a[3])
}
