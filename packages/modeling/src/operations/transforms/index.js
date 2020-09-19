/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * const { center, rotateX, translate } = require('@jscad/modeling').transforms
 */
module.exports = {
  align: require('./align'),

  center: require('./center').center,
  centerX: require('./center').centerX,
  centerY: require('./center').centerY,
  centerZ: require('./center').centerZ,

  mirror: require('./mirror').mirror,
  mirrorX: require('./mirror').mirrorX,
  mirrorY: require('./mirror').mirrorY,
  mirrorZ: require('./mirror').mirrorZ,

  rotate: require('./rotate').rotate,
  rotateX: require('./rotate').rotateX,
  rotateY: require('./rotate').rotateY,
  rotateZ: require('./rotate').rotateZ,

  scale: require('./scale').scale,
  scaleX: require('./scale').scaleX,
  scaleY: require('./scale').scaleY,
  scaleZ: require('./scale').scaleZ,

  transform: require('./transform'),

  translate: require('./translate').translate,
  translateX: require('./translate').translateX,
  translateY: require('./translate').translateY,
  translateZ: require('./translate').translateZ
}
