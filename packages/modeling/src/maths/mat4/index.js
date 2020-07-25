/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * @see {@link mat4} for data structure information.
 * @module modeling/maths/mat4
 */
module.exports = {
  add: require('./add'),
  clone: require('./clone'),
  create: require('./create'),
  equals: require('./equals'),
  fromRotation: require('./fromRotation'),
  fromScaling: require('./fromScaling'),
  fromTaitBryanRotation: require('./fromTaitBryanRotation'),
  fromTranslation: require('./fromTranslation'),
  fromValues: require('./fromValues'),
  fromXRotation: require('./fromXRotation'),
  fromYRotation: require('./fromYRotation'),
  fromZRotation: require('./fromZRotation'),
  identity: require('./identity'),
  isMirroring: require('./isMirroring'),
  mirror: require('./mirror'),
  mirrorByPlane: require('./mirrorByPlane'),
  multiply: require('./multiply'),
  rightMultiplyVec2: require('./rightMultiplyVec2'),
  rightMultiplyVec3: require('./rightMultiplyVec3'),
  rotate: require('./rotate'),
  rotateX: require('./rotateX'),
  rotateY: require('./rotateY'),
  rotateZ: require('./rotateZ'),
  scale: require('./scale'),
  subtract: require('./subtract'),
  toString: require('./toString'),
  translate: require('./translate')
}
