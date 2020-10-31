/**
 * Mirror the given geometries using the given options.
 * @param {Object} options - options for mirror
 * @param {Array} [options.origin=[0,0,0]] - the origin of the plane
 * @param {Array} [options.normal=[0,0,1]] - the normal vector of the plane
 * @param {...Object} geometries - the geometries to mirror
 * @return {Object|Array} the mirrored geometry, or a list of mirrored geometry
 * @alias module:modeling/transforms.mirror
 *
 * @example
 * let myshape = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
 */
export function mirror(options: {
    origin: any[];
    normal: any[];
}, ...objects: any[]): any | any[];
/**
 * Mirror the given geometries about the X axis.
 * @param {...Object} geometries - the geometries to mirror
 * @return {Object|Array} the mirrored geometry, or a list of mirrored geometry
 * @alias module:modeling/transforms.mirrorX
 */
export function mirrorX(...objects: any[]): any | any[];
/**
 * Mirror the given geometries about the Y axis.
 * @param {...Object} geometries - the geometries to mirror
 * @return {Object|Array} the mirrored geometry, or a list of mirrored geometry
 * @alias module:modeling/transforms.mirrorY
 */
export function mirrorY(...objects: any[]): any | any[];
/**
 * Mirror the given object(s) about the Z axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored geometry, or a list of mirrored geometry
 * @alias module:modeling/transforms.mirrorZ
 */
export function mirrorZ(...objects: any[]): any | any[];
