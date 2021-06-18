/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * @see {@link mat4} for data structure information.
 * @module modeling/maths/mat4
 */
module.exports = {
  add: require('./add'),
  clone: require('./clone'),
  copy: require('./copy'),
  create: require('./create'),
  invert: require('./invert'),
  equals: require('./equals'),
  fromRotation: require('./fromRotation'),
  fromScaling: require('./fromScaling'),
  fromTaitBryanRotation: require('./fromTaitBryanRotation'),
  fromTranslation: require('./fromTranslation'),
  fromValues: require('./fromValues'),
  fromVectorRotation: require('./fromVectorRotation'),
  fromXRotation: require('./fromXRotation'),
  fromYRotation: require('./fromYRotation'),
  fromZRotation: require('./fromZRotation'),
  identity: require('./identity'),
  isIdentity: require('./isIdentity'),
  isOnlyTransformScale: require('./isOnlyTransformScale'),
  isMirroring: require('./isMirroring'),
  mirrorByPlane: require('./mirrorByPlane'),
  multiply: require('./multiply'),
  rotate: require('./rotate'),
  rotateX: require('./rotateX'),
  rotateY: require('./rotateY'),
  rotateZ: require('./rotateZ'),
  scale: require('./scale'),
  subtract: require('./subtract'),
  toString: require('./toString'),
  translate: require('./translate')
}
