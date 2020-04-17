module.exports = {
  line: require('./line'),
  arc: require('./arc'),
  circle: require('./ellipse').circle,
  ellipse: require('./ellipse').ellipse,
  rectangle: require('./rectangle').rectangle,
  square: require('./rectangle').square,

  cube: require('./cuboid').cube,
  cuboid: require('./cuboid').cuboid,
  // cylinder: require('./cylinderElliptic'),
  // cylinderElliptic: require('./cylinderElliptic').cylinderElliptic,
  // geodesicSphere: require('./geodesicSphere'),
  //
  // polygon: require('./polygon'),
  // polyhedron: require('./polyhedron'),

  // roundedCuboid: require('./roundedCuboid'),
  // roundedCylinder: require('./roundedCylinder'),
  // roundedRectangle: require('./roundedRectangle'),
  ellipsoid: require('./ellipsoid').ellipsoid,
  sphere: require('./ellipsoid').sphere
  // star: require('./star'),
  // torus: require('./torus')
}
