export = fromTaitBryanRotation;
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
declare function fromTaitBryanRotation(yaw: number, pitch: number, roll: number): any;
