export = extrudeRectangular;
/**
 * Extrude the given geometry by following the outline(s) with a rectangle.
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {...Object} geometry - the list of geometry to extrude
 * @return {Object|Array} the extruded object, or a list of extruded objects
 * @alias module:modeling/extrusions.extrudeRectangular
 *
 * @example:
 * let mywalls = extrudeRectangular({offset: [0,0,10]}, square())
 */
declare function extrudeRectangular(options: {
    size: number;
    height: number;
}, ...objects: any[]): any | any[];
