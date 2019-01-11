/**
 * Creates a new unbounded 2D line initialized with the given values.
 *
 * @param {Number} x X coordinate of the unit normal
 * @param {Number} y Y coordinate of the unit normal
 * @param {Number} w length (positive) of the normal segment
 * @returns {line2} a new unbounded 2D line
 */
const fromValues = (x, y, w) => {
  const out = new Float32Array(3)
  out[0] = x
  out[1] = y
  out[2] = w
  return out
}

module.exports = fromValues
