export = interpolateBetween2DPointsForY;
/**
 * Get the X coordinate of a point with a certain Y coordinate, interpolated between two points.
 * Interpolation is robust even if the points have the same Y coordinate
 * @return {Array} X and Y of interpolated point
 * @alias module:modeling/utils.interpolateBetween2DPointsForY
 */
declare function interpolateBetween2DPointsForY(point1: any, point2: any, y: any): any[];
