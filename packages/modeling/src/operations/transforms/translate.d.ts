/**
 * Translate the given geometries using the given options.
 * @param {Array} offset - offset (vector) of which to translate the object
 * @param {...Object} geometries - the geometries to translate
 * @return {Object|Array} the translated geometry, or a list of translated geometries
 * @alias module:modeling/transforms.translate
 *
 * @example
 * const newsphere = translate([5, 0, 10], sphere())
 */
export function translate(offset: any[], ...objects: any[]): any | any[];
/**
 * Translate the given geometries along the X axis using the given options.
 * @param {Number} offset - X offset of which to translate the object
 * @param {...Object} geometries - the geometries to translate
 * @return {Object|Array} the translated geometry, or a list of translated geometries
 * @alias module:modeling/transforms.translateX
 */
export function translateX(offset: number, ...objects: any[]): any | any[];
/**
 * Translate the given geometries along the Y axis using the given options.
 * @param {Number} offset - Y offset of which to translate the object
 * @param {...Object} geometries - the geometries to translate
 * @return {Object|Array} the translated geometry, or a list of translated geometries
 * @alias module:modeling/transforms.translateY
 */
export function translateY(offset: number, ...objects: any[]): any | any[];
/**
 * Translate the given geometries along the Z axis using the given options.
 * @param {Number} offset - Z offset of which to translate the object
 * @param {...Object} geometries - the geometries to translate
 * @return {Object|Array} the translated geometry, or a list of translated geometries
 * @alias module:modeling/transforms.translateZ
 */
export function translateZ(offset: number, ...objects: any[]): any | any[];
