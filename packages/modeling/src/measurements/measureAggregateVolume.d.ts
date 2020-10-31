export = measureAggregateVolume;
/**
 * Measure the total (aggregate) volume for the given geometries.
 * This calculation will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
declare function measureAggregateVolume(...geometries: any[]): number;
