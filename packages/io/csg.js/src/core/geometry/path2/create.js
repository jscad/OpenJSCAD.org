/**
 * @typedef {Object} Path2 - 2d Path
 * @property {Array} points
 * @property {Boolean} isCanonicalized boolean flag for canonicalized state
 */

/** creates an 'empty'/ default 2d path
 * Represents a series of points, connected by infinitely thin lines.
 * A path can be open or closed, i.e. additional line between first and last points.
 * The difference between Path2 and Geom2 is that a path is a 'thin' line, whereas a Geom2 is an enclosed area.
 * @constructor
 * @returns {Path2}
 */
const create = () => {
  return {
    points: [],
    closed: false
  }
}

module.exports = create