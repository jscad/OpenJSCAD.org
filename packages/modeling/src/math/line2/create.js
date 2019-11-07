/**
 * Represents a unbounded line in 2D space, positioned at a point of origin.
 * A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
 * and w. The line passes through the point of origin, i.e. scale(w, <normal>).
 * Equation: a point (P) is on line (L) if dot(L.normal, P) == L.w
*/

/**
 * Create a unbounded 2D line, positioned at 0,0, and running along the X axis.
 *
 * @returns {line2} a new unbounded 2D line
 */
const create = () => {
  const out = new Float32Array(3)
  out[0] = 0 // normal
  out[1] = 1
  out[2] = 0 // distance
  return out
}

module.exports = create
