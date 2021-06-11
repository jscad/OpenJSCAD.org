/**
 * Represents a unbounded line in 2D space, positioned at a point of origin.
 * A line is parametrized by a normal vector (perpendicular to the line, rotated 90 degrees counter clockwise) and
 * distance from the origin.
 *
 * Equation: A Point (P) is on Line (L) if dot(L.normal, P) == L.distance
 *
 * The contents of the array are a normal [0,1] and a distance [2].
 * @typedef {Array} line2
 */

/**
 * Create a line, positioned at 0,0, and running along the X axis.
 *
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.create
 */
const create = () => [0, 1, 0] // normal and distance

module.exports = create
