/**
 * Rotate the given geometries using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} geometries - the geometries to rotate
 * @return {Object|Array} the rotated geometry, or a list of rotated geometries
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newsphere = rotate([Math.PI / 4, 0, 0], sphere())
 */
export function rotate(angles: any[], ...objects: any[]): any | any[];
/**
 * Rotate the given object(s) about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} geometries - the geometries to rotate
 * @return {Object|Array} the rotated geometry, or a list of rotated geometries
 * @alias module:modeling/transforms.rotateX
 */
export function rotateX(angle: number, ...objects: any[]): any | any[];
/**
 * Rotate the given object(s) about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} geometries - the geometries to rotate
 * @return {Object|Array} the rotated geometry, or a list of rotated geometries
 * @alias module:modeling/transforms.rotateY
 */
export function rotateY(angle: number, ...objects: any[]): any | any[];
/**
 * Rotate the given object(s) about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} geometries - the geometries to rotate
 * @return {Object|Array} the rotated geometry, or a list of rotated geometries
 * @alias module:modeling/transforms.rotateZ
 */
export function rotateZ(angle: number, ...objects: any[]): any | any[];
