/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 *
 * The vertices used to initialize a polygon must be coplanar and form a convex shape.
 *
 * @see {@link Poly3} for data structure information.
 * @module modeling/poly3
 *
 * @example
 * import { poly3 } from '@jscad/modeling'
 * const polygon = poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 */

export { clone } from './clone.js'
export { create } from './create.js'
export { fromVerticesAndPlane } from './fromVerticesAndPlane.js'
export { invert } from './invert.js'
export { isA } from './isA.js'
export { isConvex } from './isConvex.js'
export { measureArea } from './measureArea.js'
export { measureBoundingBox } from './measureBoundingBox.js'
export { measureBoundingSphere, measureBoundingSphereAndCache } from './measureBoundingSphere.js'
export { measureSignedVolume } from './measureSignedVolume.js'
export { plane } from './plane.js'
export { toVertices } from './toVertices.js'
export { toString } from './toString.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
