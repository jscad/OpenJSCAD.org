/**
 * Center the given geometries using the given options.
 * @param {Object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.center=[0,0,0]] - point of which to center the object upon
 * @param {...Object} geometries - the geometries to center
 * @return {Object|Array} the centered geometry, or a list of centered geometries
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
export function center(options: {
    axes: any[];
    center: any[];
}, ...geometries: any[]): any | any[];
/**
 * Center the given geometries about the X axis.
 * @param {...Object} geometries - the geometries to center
 * @return {Object|Array} the centered geometry, or a list of centered geometry
 * @alias module:modeling/transforms.centerX
 */
export function centerX(...objects: any[]): any | any[];
/**
 * Center the given geometries about the Y axis.
 * @param {...Object} geometries - the geometries to center
 * @return {Object|Array} the centered geometry, or a list of centered geometry
 * @alias module:modeling/transforms.centerY
 */
export function centerY(...objects: any[]): any | any[];
/**
 * Center the given geometries about the Z axis.
 * @param {...Object} geometries - the geometries to center
 * @return {Object|Array} the centered geometry, or a list of centered geometry
 * @alias module:modeling/transforms.centerZ
 */
export function centerZ(...objects: any[]): any | any[];
