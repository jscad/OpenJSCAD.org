const vec3 = require('../math/vec3')

/** Create a connector from the given point, axis and normal
 * @param {Vec3} point the point/location of the connector
 * @param {Vec3} axis the axis of the connector
 * @param {Vec3} normal the normal of the connector
 * @returns {Connector} a new connector
 */
const fromPointAxisNormal = (point, axis, normal) => {
  return {
    point,
    axis: vec3.unit(axis),
    normal: vec3.unit(normal)
  }
}

module.exports = fromPointAxisNormal