export = transformationBetween;
/**
 * Get the transformation matrix that connects the given connectors.
 * @param {Object} options
 * @param {Boolean} [options.mirror=false] - the 'axis' vectors should point in the same direction
 *  true: the 'axis' vectors should point in opposite direction
 * @param {Number} [options.normalRotation=0] - the angle (RADIANS) of rotation between the 'normal' vectors
 * @param {connector} from - connector from which to connect
 * @param {connector} to - connector to which to connected
 * @returns {mat4} - the matrix that transforms (connects) one connector to another
 * @alias module:modeling/connectors.transformationBetween
 */
declare function transformationBetween(options: {
    mirror: boolean;
    normalRotation: number;
}, from: any, to: any): any;
