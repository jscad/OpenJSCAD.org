export = measureAggregateArea;
/**
 * Measure the total (aggregate) area for the given geometries.
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
declare function measureAggregateArea(...geometries: any[]): number;
