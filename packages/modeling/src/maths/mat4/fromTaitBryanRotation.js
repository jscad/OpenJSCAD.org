
const clone = require('./clone')

/**
 * Creates a matrix from the given Tait–Bryan angles.
 * Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.
 * @see https://en.wikipedia.org/wiki/Euler_angles
 * @param {Number} yaw - Z rotation in radians
 * @param {Number} pitch - Y rotation in radians
 * @param {Number} roll - X rotation in radians
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromTaitBryanRotation
 */
const fromTaitBryanRotation = (yaw, pitch, roll) => {
  // precompute sines and cosines of Euler angles
  const sy = Math.sin(yaw)
  const cy = Math.cos(yaw)
  const sp = Math.sin(pitch)
  const cp = Math.cos(pitch)
  const sr = Math.sin(roll)
  const cr = Math.cos(roll)

  // create and populate rotation matrix
  // left-hand-rule rotation
  // const els = [
  //  cp*cy, sr*sp*cy - cr*sy, sr*sy + cr*sp*cy, 0,
  //  cp*sy, cr*cy + sr*sp*sy, cr*sp*sy - sr*cy, 0,
  //  -sp, sr*cp, cr*cp, 0,
  //  0, 0, 0, 1
  // ]
  // right-hand-rule rotation
  const els = [
    cp * cy, cp * sy, -sp, 0,
    sr * sp * cy - cr * sy, cr * cy + sr * sp * sy, sr * cp, 0,
    sr * sy + cr * sp * cy, cr * sp * sy - sr * cy, cr * cp, 0,
    0, 0, 0, 1
  ]
  return clone(els)
}

module.exports = fromTaitBryanRotation
