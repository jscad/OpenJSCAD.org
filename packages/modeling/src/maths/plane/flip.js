/**
 * Flip the given plane.
 *
 * @param {plane} out - receiving plane
 * @param {plane} plane - plane to flip
 * @return {plane} out
 * @alias module:modeling/maths/plane.flip
 */
const flip = (out, plane) => {
  out[0] = -plane[0]
  out[1] = -plane[1]
  out[2] = -plane[2]
  out[3] = -plane[3]
  return out
}

module.exports = flip
