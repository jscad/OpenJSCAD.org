/**
 * Scale the given geometries using the given options.
 * @param {Array} factors - X, Y, Z factors by which to scale the object
 * @param {...Object} geometries - the geometries to scale
 * @return {Object|Array} the scaled geometry, or a list of scaled geometries
 * @alias module:modeling/transforms.scale
 *
 * @example
 * let myshape = scale([5, 0, 10], sphere())
 */
export function scale(factors: any[], ...objects: any[]): any | any[];
/**
 * Scale the given geometries about the X axis using the given options.
 * @param {Number} factor - X factor by which to scale the object
 * @param {...Object} geometries - the geometries to scale
 * @return {Object|Array} the scaled geometry, or a list of scaled geometries
 * @alias module:modeling/transforms.scaleX
 */
export function scaleX(offset: any, ...objects: any[]): any | any[];
/**
 * Scale the given geometries about the Y axis using the given options.
 * @param {Number} factor - Y factor by which to scale the object
 * @param {...Object} geometries - the geometries to scale
 * @return {Object|Array} the scaled geometry, or a list of scaled geometries
 * @alias module:modeling/transforms.scaleY
 */
export function scaleY(offset: any, ...objects: any[]): any | any[];
/**
 * Scale the given geometries about the Z axis using the given options.
 * @param {Number} factor - Z factor by which to scale the object
 * @param {...Object} geometries - the geometries to scale
 * @return {Object|Array} the scaled geometry, or a list of scaled geometries
 * @alias module:modeling/transforms.scaleZ
 */
export function scaleZ(offset: any, ...objects: any[]): any | any[];
