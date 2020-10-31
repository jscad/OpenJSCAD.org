export = measureBoundingBox;
/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for each geometry, i.e. [[X,Y,Z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
declare function measureBoundingBox(...geometries: any[]): any[];
