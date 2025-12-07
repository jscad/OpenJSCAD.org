/**
 * Represents a 3D geometry consisting of a list of ordered vertices.
 *
 * @see {@link Path3} for data structure information.
 * @module modeling/geometries/path3
 *
 * @example
 * import { path3 } from '@jscad/modeling'
 * let myShape = path3.fromVertices({ closed: true }, [[0,0,0], [4,0,0], [4,3,0]])
 */
export { close } from './close.js'
export { concat } from './concat.js'
export { create } from './create.js'
export { equals } from './equals.js'
export { fromVertices } from './fromVertices.js'
export { isA } from './isA.js'
export { reverse } from './reverse.js'
export { toString } from './toString.js'
export { toVertices } from './toVertices.js'
export { transform } from './transform.js'
export { validate } from './validate.js'
