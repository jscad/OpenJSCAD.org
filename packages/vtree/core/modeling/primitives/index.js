module.exports = {
  // arc: require('./arc'),
  // circle: require('./ellipse').circle,
  // cube: require('./cuboid').cube,
  cuboid: require('./cuboid'),
  cylinder: require('./cylinderElliptic'),
  // cylinderElliptic: require('./cylinderElliptic').cylinderElliptic,
  ellipse: require('./ellipse'), // .ellipse
  // ellipsoid: require('./ellipsoid').ellipsoid,
  // geodesicSphere: require('./geodesicSphere'),
  // line: require('./line'),
  // polygon: require('./polygon'),
  // polyhedron: require('./polyhedron'),
  rectangle: require('./rectangle').rectangle,
  square: require('./rectangle').square,
  // roundedCuboid: require('./roundedCuboid'),
  // roundedCylinder: require('./roundedCylinder'),
  // roundedRectangle: require('./roundedRectangle'),
  sphere: require('./ellipsoid').sphere
  // star: require('./star'),
  // torus: require('./torus')
}
