module.exports = {
  clone: require('../vec4/clone'),
  create: require('../vec4/create'),
  equals: require('./equals'),
  flip: require('./flip'),
  fromNormalAndPoint: require('./fromNormalAndPoint'),
  fromValues: require('../vec4/fromValues'),
  fromPoints: require('./fromPoints'),
  fromPointsRandom: require('./fromPointsRandom'),
  signedDistanceToPoint: require('./signedDistanceToPoint'),
  toString: require('../vec4/toString'),
  transform: require('./transform'),
  splitLineSegmentByPlane: require('./splitLineSegmentByPlane')
}
