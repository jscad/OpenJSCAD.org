/**
 * Create a matrix for mirroring about the given plane.
 *
 * @param {mat4} out - receiving matrix
 * @param {vec4} plane - plane of which to mirror the matrix
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.mirrorByPlane
 */
const mirrorByPlane = (out, plane) => {
  const [nx, ny, nz, w] = plane

  out[0] = (1.0 - 2.0 * nx * nx)
  out[1] = (-2.0 * ny * nx)
  out[2] = (-2.0 * nz * nx)
  out[3] = 0
  out[4] = (-2.0 * nx * ny)
  out[5] = (1.0 - 2.0 * ny * ny)
  out[6] = (-2.0 * nz * ny)
  out[7] = 0
  out[8] = (-2.0 * nx * nz)
  out[9] = (-2.0 * ny * nz)
  out[10] = (1.0 - 2.0 * nz * nz)
  out[11] = 0
  out[12] = (2.0 * nx * w)
  out[13] = (2.0 * ny * w)
  out[14] = (2.0 * nz * w)
  out[15] = 1

  return out
}

module.exports = mirrorByPlane
