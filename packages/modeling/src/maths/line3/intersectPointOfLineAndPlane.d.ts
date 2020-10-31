export = intersectToPlane;
/**
 * Determine the closest point on the given plane to the given line.
 *
 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
 *
 * @param {plane} plane - the plane of reference
 * @param {line3} line - the line of reference
 * @returns {vec3} a point on the line
 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
 */
declare function intersectToPlane(plane: any, line: any): any;
