export = intersectToLine;
/**
 * Return the point of intersection between the given lines.
 *
 * The point will have Infinity values if the lines are paralell.
 * The point will have NaN values if the lines are the same.
 *
 * @param {line2} line1 a 2D line for reference
 * @param {line2} line2 a 2D line for reference
 * @return {vec2} the point of intersection
 * @alias module:modeling/maths/line2.intersectPointOfLines
 */
declare function intersectToLine(line1: any, line2: any): any;
