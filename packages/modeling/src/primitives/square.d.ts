export = square;
/**
 * Construct an axis-aligned square in two dimensional space with four equal sides and four 90-degree angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {Number} [options.size=2] - dimension of square
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
declare function square(options?: {
    center: any[];
    size: number;
}): any;
