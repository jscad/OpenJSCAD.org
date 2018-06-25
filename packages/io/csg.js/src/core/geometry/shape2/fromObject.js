const fromSides = require('./fromSides')
const Side = require('./math/Side')

/** Reconstruct a Shape2 from an object with identical property names.
 * @param {Object} obj - anonymous object, typically from JSON
 * @returns {Shape2} new Shape2 object
 */
const fromObject = function (obj) {
  const sides = obj.sides.map(side => Side.fromObject(side))
  let cag = fromSides(sides)
  cag.isCanonicalized = obj.isCanonicalized
  return cag
}

module.exports = fromObject
