const { sin, cos } = require('../utils/trigonometry')

/**
 * Creates a matrix from the given Tait–Bryan angles.
 *
 * Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.
 * @see https://en.wikipedia.org/wiki/Euler_angles
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} yaw - Z rotation in radians
 * @param {Number} pitch - Y rotation in radians
 * @param {Number} roll - X rotation in radians
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromTaitBryanRotation
 * @example
 * let matrix = fromTaitBryanRotation(create(), TAU / 4, 0, TAU / 2)
 */
const fromTaitBryanRotation = (out, yaw, pitch, roll) => {
  // precompute sines and cosines of Euler angles
  const sy = sin(yaw)
  const cy = cos(yaw)
  const sp = sin(pitch)
  const cp = cos(pitch)
  const sr = sin(roll)
  const cr = cos(roll)

  // create and populate rotation matrix
  // left-hand-rule rotation
  // const els = [
  //  cp*cy, sr*sp*cy - cr*sy, sr*sy + cr*sp*cy, 0,
  //  cp*sy, cr*cy + sr*sp*sy, cr*sp*sy - sr*cy, 0,
  //  -sp, sr*cp, cr*cp, 0,
  //  0, 0, 0, 1
  // ]
  // right-hand-rule rotation
  out[0] = cp * cy
  out[1] = cp * sy
  out[2] = -sp
  out[3] = 0
  out[4] = sr * sp * cy - cr * sy
  out[5] = cr * cy + sr * sp * sy
  out[6] = sr * cp
  out[7] = 0
  out[8] = sr * sy + cr * sp * cy
  out[9] = cr * sp * sy - sr * cy
  out[10] = cr * cp
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromTaitBryanRotation
