/**
 * Represents a four dimensional vector.
 * @see {@link vec4} for data structure information.
 * @module modeling/maths/vec4
 */
module.exports = {
  clone: require('./clone'),
  copy: require('./copy'),
  create: require('./create'),
  dot: require('./dot'),
  equals: require('./equals'),
  fromScalar: require('./fromScalar'),
  fromValues: require('./fromValues'),
  toString: require('./toString'),
  transform: require('./transform')
}
