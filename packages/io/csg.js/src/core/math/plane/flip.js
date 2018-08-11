module.exports = flip
const fromData = require('./fromData')

/**
 * Flip the given plane
 * @return {Array} a new plane with properly typed values
 */
function flip (a) {
  return fromData([-a[0], -a[1], -a[2], -a[3]])
}
