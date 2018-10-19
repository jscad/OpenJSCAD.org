module.exports = {
  clone: require('../vec4/clone'),
  create: require('../vec4/create'),
  equals: require('./equals'),
  flip: require('./flip'),
  fromNormalAndPoint: require('./fromNormalAndPoint'),
  fromValues: require('../vec4/fromValues'),
  fromVec3s: require('./fromVec3s'),
  signedDistanceToPoint: require('./signedDistanceToPoint'),
  toString: require('../vec4/toString'),
  transformMat4: require('./transformMat4'),
  splitLineSegmentByPlane: require('./splitLineSegmentByPlane')
}
