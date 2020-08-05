module.exports = {
  // 2D primitives
  arc: require('./arc'),
  circle: require('./ellipse').circle,
  ellipse: require('./ellipse').ellipse,
  line: require('./line'),
  rectangle: require('./rectangle').rectangle,
  square: require('./rectangle').square,

  // 3D primitives
  cube: require('./cuboid').cube,
  cuboid: require('./cuboid').cuboid,
  cylinder: require('./cylinderElliptic').cylinder,
  cylinderElliptic: require('./cylinderElliptic').cylinderElliptic,
  ellipsoid: require('./ellipsoid').ellipsoid,
  geodesicSphere: require('./geodesicSphere'),
  polygon: require('./polygon'),
  polyhedron: require('./polyhedron'),
  roundedCuboid: require('./roundedCuboid'),
  roundedCylinder: require('./roundedCylinder'),
  roundedRectangle: require('./roundedRectangle'),
  sphere: require('./ellipsoid').sphere,
  star: require('./star'),

  torus: require('./torus')
}
