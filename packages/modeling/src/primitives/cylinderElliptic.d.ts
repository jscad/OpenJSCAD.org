export = cylinderElliptic;
/**
 * Construct an elliptic cylinder in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Vector3} [options.height=2] - height of cylinder
 * @param {Vector2D} [options.startRadius=[1,1]] - radius of rounded start, must be two dimensional array
 * @param {Number} [options.startAngle=0] - start angle of cylinder, in radians
 * @param {Vector2D} [options.endRadius=[1,1]] - radius of rounded end, must be two dimensional array
 * @param {Number} [options.endAngle=(Math.PI * 2)] - end angle of cylinder, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinderElliptic
 *
 * @example
 * let myshape = cylinderElliptic({
 *     height: 2,
 *     startRadius: [10,5],
 *     endRadius: [8,3]
 *   })
 */
declare function cylinderElliptic(options?: {
    center: any[];
    height: any;
    startRadius: any;
    startAngle: number;
    endRadius: any;
    endAngle: number;
    segments: number;
}): any;
