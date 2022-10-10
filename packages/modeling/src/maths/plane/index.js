/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 * @see {@link plane} for data structure information.
 * @module modeling/maths/plane
 */

/**
 * @see [vec4.clone()]{@link module:modeling/maths/vec4.clone}
 * @function clone
 */
export { clone } from '../vec4/clone.js'
/**
 * @see [vec4.copy()]{@link module:modeling/maths/vec4.copy}
 * @function copy
 */
export { copy } from '../vec4/copy.js'
/**
 * @see [vec4.create()]{@link module:modeling/maths/vec4.create}
 * @function create
 */
export { create } from '../vec4/create.js'
/**
 * @see [vec4.equals()]{@link module:modeling/maths/vec4.equals}
 * @function equals
 */
export { equals } from '../vec4/equals.js'
export { flip } from './flip.js'
export { fromNormalAndPoint } from './fromNormalAndPoint.js'
/**
 * @see [vec4.fromValues()]{@link module:modeling/maths/vec4.fromValues}
 * @function fromValues
 */
export { fromValues } from '../vec4/fromValues.js'
export { fromPoints } from './fromPoints.js'
export { fromPointsRandom } from './fromPointsRandom.js'
export { projectionOfPoint } from './projectionOfPoint.js'
export { signedDistanceToPoint } from './signedDistanceToPoint.js'
/**
 * @see [vec4.toString()]{@link module:modeling/maths/vec4.toString}
 * @function toString
 */
export { toString } from '../vec4/toString.js'
export { transform } from './transform.js'
