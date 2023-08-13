/**
 * Flip the given plane.
 *
 * @param {Plane} out - receiving plane
 * @param {Plane} plane - plane to flip
 * @return {Plane} out
 * @alias module:modeling/maths/plane.flip
 */
export const flip = (out, plane) => {
  out[0] = -plane[0]
  out[1] = -plane[1]
  out[2] = -plane[2]
  out[3] = -plane[3]
  return out
}
