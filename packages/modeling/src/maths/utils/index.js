/**
 * Utility functions for maths.
 * @module modeling/maths/utils
 * @example
 * import { maths } from '@jscad/modeling'
 * const { aboutEqualNormals, area, intersect, solve2Linear } = maths.utils
 */
import { cos, sin } from './trigonometry.js'
export {
  cos,
  sin
}

export { aboutEqualNormals } from './aboutEqualNormals.js'
export { area } from './area.js'
export { interpolateBetween2DPointsForY } from './interpolateBetween2DPointsForY.js'
export { intersect } from './intersect.js'
export { solve2Linear } from './solve2Linear.js'
