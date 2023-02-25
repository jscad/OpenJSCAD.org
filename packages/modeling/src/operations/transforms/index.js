/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * import { center, rotateX, translate } from '@jscad/modeling/transforms'
 */
export { align } from './align.js'

export { center, centerX, centerY, centerZ } from './center.js'
export { mirror, mirrorX, mirrorY, mirrorZ } from './mirror.js'
export { rotate, rotateX, rotateY, rotateZ } from './rotate.js'
export { scale, scaleX, scaleY, scaleZ } from './scale.js'
export { translate, translateX, translateY, translateZ } from './translate.js'

export { transform } from './transform.js'
