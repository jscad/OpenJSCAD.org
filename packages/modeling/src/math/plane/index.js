/**
 * @module modeling/math/plane
 */
module.exports = {
  /**
   * @see [vec4.clone()]{@link module:modeling/math/vec4.clone}
   * @function clone
   */
  clone: require('../vec4/clone'),
  /**
   * @see [vec4.create()]{@link module:modeling/math/vec4.create}
   * @function create
   */
  create: require('../vec4/create'),
  equals: require('./equals'),
  flip: require('./flip'),
  fromNormalAndPoint: require('./fromNormalAndPoint'),
  /**
   * @see [vec4.fromValues()]{@link module:modeling/math/vec4.fromValues}
   * @function fromValues
   */
  fromValues: require('../vec4/fromValues'),
  fromPoints: require('./fromPoints'),
  fromPointsRandom: require('./fromPointsRandom'),
  signedDistanceToPoint: require('./signedDistanceToPoint'),
  splitLineSegmentByPlane: require('./splitLineSegmentByPlane'),
  /**
   * @see [vec4.toString()]{@link module:modeling/math/vec4.toString}
   * @function toString
   */
  toString: require('../vec4/toString'),
  transform: require('./transform')
}
