/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 * @see {@link poly3} for data structure information.
 * @module modeling/geometries/poly3
 *
 * @example
 * poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 *
 * @example
 * {"vertices": [[0,0,0], [4,0,0], [4,3,12]]}
 */
export { clone } from './clone.js'
export { create } from './create.js'
export { fromPoints } from './fromPoints.js'
export { fromPointsAndPlane } from './fromPointsAndPlane.js'
export { invert } from './invert.js'
export { isA } from './isA.js'
export { isConvex } from './isConvex.js'
export { measureArea } from './measureArea.js'
export { measureBoundingBox } from './measureBoundingBox.js'
export { measureBoundingSphere } from './measureBoundingSphere.js'
export { measureSignedVolume } from './measureSignedVolume.js'
export { plane } from './plane.js'
export { toPoints } from './toPoints.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
