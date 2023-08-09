import { concat } from './concat.js'
import { create } from './create.js'

/**
 * Append the given list of points to the end of the given geometry.
 * @param {Array} points - the points (2D) to append to the given path
 * @param {Path2} geometry - the given path
 * @returns {Path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendPoints
 * @example
 * let newPath = appendPoints([[3, 4], [4, 5]], oldPath)
 */
export const appendPoints = (points, geometry) => concat(geometry, create(points))
