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
  circle: require('./circle'),
  cube: require('./cube'),
  cuboid: require('./cuboid'),
  cylinder: require('./cylinder'),
  cylinderElliptic: require('./cylinderElliptic'),
  ellipse: require('./ellipse'),
  ellipsoid: require('./ellipsoid'),
  geodesicSphere: require('./geodesicSphere'),
  line: require('./line'),
  polygon: require('./polygon'),
  polyhedron: require('./polyhedron'),
  rectangle: require('./rectangle'),
  roundedCuboid: require('./roundedCuboid'),
  roundedCylinder: require('./roundedCylinder'),
  roundedRectangle: require('./roundedRectangle'),
  sphere: require('./sphere'),
  square: require('./square'),
  star: require('./star'),
  torus: require('./torus'),
  triangle: require('./triangle')
}
