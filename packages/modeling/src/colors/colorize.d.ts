export = colorize;
/**
 * Assign the given color to the given objects.
 * Note: The color should only be assigned after performing all operations.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {Object|Array} objects - the objects of which to color
 * @return {Object|Array} new geometry, or list of new geometries with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildcylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
declare function colorize(color: any[], ...objects: any | any[]): any | any[];
