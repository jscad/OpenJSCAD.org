export = rectangle;
/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides and four 90-degree angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
declare function rectangle(options?: {
    center: any[];
    size: any[];
}): any;
