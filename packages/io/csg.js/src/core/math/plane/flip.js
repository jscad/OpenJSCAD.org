const fromValues = require('../vec4/fromValues')

/**
 * Flip the given plane
 * @return {vec4} a new plane
 */
const flip = (a) => {
  return fromValues(-a[0], -a[1], -a[2], -a[3])
}

module.exports = flip
