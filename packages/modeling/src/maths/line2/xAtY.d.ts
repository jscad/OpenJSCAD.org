export = xAtY;
/**
 * Determine the X coordinate of the given line at the Y coordinate.
 *
 * The X coordinate will be Infinity if the line is parallel to the X axis.
 *
 * @param {Number} y the Y coordinate on the line
 * @param {line2} line the 2D line of reference
 * @return {Number} the X coordinate on the line
 * @alias module:modeling/maths/line2.xAtY
 */
declare function xAtY(y: number, line: any): number;
