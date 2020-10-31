export = extrudeLinear;
/**
 * Extrude the given geometry in an upward linear direction using the given options.
 * @param {Object} options - options for extrude
 * @param {Array} [options.height=1] the height of the extrusion
 * @param {Number} [options.twistAngle=0] the final rotation (RADIANS) about the origin of the shape (if any)
 * @param {Integer} [options.twistSteps=1] the resolution of the twist about the axis (if any)
 * @param {...Object} geometry - the list of geometry to extrude
 * @return {Object|Array} the extruded geometry, or a list of extruded geometry
 * @alias module:modeling/extrusions.extrudeLinear
 *
 * @example
 * let myshape = extrudeLinear({height: 10}, rectangle({size: [20, 25]}))
 */
declare function extrudeLinear(options: {
    height: any[];
    twistAngle: number;
    twistSteps: any;
}, ...objects: any[]): any | any[];
