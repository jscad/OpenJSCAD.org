export = fromPointAxisNormal;
/**
 * Create a connector from the given point, axis and normal.
 * @param {vec3} point - the point of the connector, relative to the parent geometry
 * @param {vec3} axis - the axis (directional vector) of the connector
 * @param {vec3} normal - the normal (directional vector) of the connector, perpendicular to the axis
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.fromPointsAxisNormal
 */
declare function fromPointAxisNormal(point: any, axis: any, normal: any): {
    point: any[];
    axis: any;
    normal: any;
};
