const create = require('./create')

/** Construct a Shape2 from a list of `Side` instances.
 * @param {Side[]} sides - list of sides
 * @returns {Shape2} new Shape2 object
 */
const fromSides = (sides) => {
  const shape2 = create()
  shape2.sides = sides
  return shape2
}

module.exports = fromSides
