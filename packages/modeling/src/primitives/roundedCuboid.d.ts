export = roundedCuboid;
/**
 * Construct an axis-aligned solid cuboid in three dimensions with rounded edges.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of rounded cube
 * @param {Array} [options.size=[2,2,2]] - dimension of rounded cube; width, depth, height
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCuboid
 *
 * @example
 * let mycube = roundedCuboid({
 *   size: [10, 20, 10],
 *   roundRadius: 2,
 *   segments: 16,
 * });
 */
declare function roundedCuboid(options?: {
    center: any[];
    size: any[];
    roundRadius: number;
    segments: number;
}): any;
