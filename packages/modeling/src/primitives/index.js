/**
 * Primitives provide the building blocks for complex parts.
 * Each primitive is a geometrical object that can be described mathematically, and therefore precise.
 * Primitives can be logically combined, transformed, extruded, etc.
 * @module modeling/primitives
 * @example
 * const { cube, ellipse, star } = require('@jscad/modeling').primitives
 */
module.exports = {
  arc: require('./arc'),
  circle: require('./ellipse').circle,
  cube: require('./cuboid').cube,
  cuboid: require('./cuboid').cuboid,
  cylinder: require('./cylinderElliptic').cylinder,
  cylinderElliptic: require('./cylinderElliptic').cylinderElliptic,
  ellipse: require('./ellipse').ellipse,
  ellipsoid: require('./ellipsoid').ellipsoid,
  geodesicSphere: require('./geodesicSphere'),
  line: require('./line'),
  polygon: require('./polygon'),
  polyhedron: require('./polyhedron'),
  rectangle: require('./rectangle').rectangle,
  roundedCuboid: require('./roundedCuboid'),
  roundedCylinder: require('./roundedCylinder'),
  roundedRectangle: require('./roundedRectangle'),
  sphere: require('./ellipsoid').sphere,
  square: require('./rectangle').square,
  star: require('./star'),
  torus: require('./torus')
}
