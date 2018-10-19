const create = require('./create')

/** Construct a Shape2 from a list of `Side` instances.
 * this is a duplicate of Shape2's fromSides to avoid circular dependency Shape2 => fromSides => Shape2
 * @param {Side[]} sides - list of sides
 * @returns {Shape2} new Shape2 object
 */
const fromSides = function (sides) {
  const shape2 = create()
  shape2.sides = sides
  return shape2
}

module.exports = fromSides
