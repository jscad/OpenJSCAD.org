export = roundedCylinder;
/**
 * Construct a solid cylinder in three dimensional space with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Array} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({
 *   height: 10,
 *   radius: 2,
 *   roundRadius: 0.5
 * })
 */
declare function roundedCylinder(options?: {
    center: any[];
    height: any[];
    radius: number;
    roundRadius: number;
    segments: number;
}): any;
