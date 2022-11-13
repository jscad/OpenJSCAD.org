/**
 * Represents a 2D polygon consisting of a list of ordered vertices.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * poly2.create([[0,0], [4,0], [4,3]])
 *
 * @example
 * {"vertices": [[0,0], [4,0], [4,3]]}
 */
export { arePointsInside } from './arePointsInside.js'
export { create } from './create.js'
export { flip } from './flip.js'
export { measureArea } from './measureArea.js'
