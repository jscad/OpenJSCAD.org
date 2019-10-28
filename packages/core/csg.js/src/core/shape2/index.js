module.exports = {
  // creation of shape2's from something
  create: require('./create'),
  // fromCompactBinary: require('./fromCompactBinary'),
  // fromFakeShape3: require('./fromFakeShape3'),
  // fromObject: require('./fromObject'),
  fromPoints: require('./fromPoints'),
  fromSides: require('./fromSides'),

  // shape2 TO something
  /* toCompactBinary: require('./toCompactBinary'),
  toShape3Wall: require('./toShape3Wall'),
  toPoints: require('./toPoints'),
  toVec3Pairs: require('./toVec3Pairs'),
  toPlanePolygons: require('./toPlanePolygons'),
  toWallPolygons: require('./toWallPolygons'),
  toString: require('./toString'),*/

  // measurements
  equals: require('./equals'),
  measureArea: require('./measureArea'),
  measureBounds: require('./measureBounds'),

  // validation
  /* validate: require('./validate'),
  validateIsSelfIntersecting: require('./validateIsSelfIntersecting') */

  // transforms
  mirror: require('./mirror'),
  /* mirrorX: require('./mirrorX'),
  mirrorY: require('./mirrorY'),
  mirrorZ: require('./mirrorZ'), */
  rotate: require('./rotate'),
  /* rotateX: require('./rotateX'),
  rotateY: require('./rotateY'),
  rotateZ: require('./rotateZ'), */
  scale: require('./scale'),
  translate: require('./translate'),
  transform: require('./transform'),

  // booleans
  union: require('./union'),
  difference: require('./difference'),
  intersection: require('./intersection'),

  // extrusions
  linearExtrude: require('./linearExtrude'),
  rotateExtrude: require('./rotateExtrude'),
  rectangularExtrude: require('./rectangularExtrude')
}
