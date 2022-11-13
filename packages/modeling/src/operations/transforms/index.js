/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * import { center, rotateX, translate } from '@jscad/modeling/transforms'
 */
import { align } from './align.js'

import { center, centerX, centerY, centerZ } from './center.js'
import { mirror, mirrorX, mirrorY, mirrorZ } from './mirror.js'
import { rotate, rotateX, rotateY, rotateZ } from './rotate.js'
import { scale, scaleX, scaleY, scaleZ } from './scale.js'
import { translate, translateX, translateY, translateZ } from './translate.js'

import { transform } from './transform.js'

export {
  align,

  center,
  centerX,
  centerY,
  centerZ,

  mirror,
  mirrorX,
  mirrorY,
  mirrorZ,

  rotate,
  rotateX,
  rotateY,
  rotateZ,

  scale,
  scaleX,
  scaleY,
  scaleZ,

  translate,
  translateX,
  translateY,
  translateZ,

  transform
}
