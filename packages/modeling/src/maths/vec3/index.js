/**
 * Represents a three dimensional vector.
 * @see {@link vec3} for data structure information.
 * @module modeling/maths/vec3
 */
module.exports = {
  abs: require('./abs'),
  add: require('./add'),
  angle: require('./angle'),
  canonicalize: require('./canonicalize'),
  clone: require('./clone'),
  create: require('./create'),
  cross: require('./cross'),
  distance: require('./distance'),
  divide: require('./divide'),
  dot: require('./dot'),
  equals: require('./equals'),
  fromArray: require('./fromArray'),
  fromScalar: require('./fromScalar'),
  fromValues: require('./fromValues'),
  fromVec2: require('./fromVec2'),
  length: require('./length'),
  lerp: require('./lerp'),
  max: require('./max'),
  min: require('./min'),
  multiply: require('./multiply'),
  negate: require('./negate'),
  normalize: require('./normalize'),
  orthogonal: require('./orthogonal'),
  rotateX: require('./rotateX'),
  rotateY: require('./rotateY'),
  rotateZ: require('./rotateZ'),
  scale: require('./scale'),
  squaredDistance: require('./squaredDistance'),
  squaredLength: require('./squaredLength'),
  subtract: require('./subtract'),
  toString: require('./toString'),
  transform: require('./transform'),
  unit: require('./unit')
}
