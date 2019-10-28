const vec3 = require('../math/vec3')
const fromPointAxisNormal = require('./fromPointAxisNormal')

/** Creates a new Connector, with normalized data
 * @param {Connector} connector the connector to normalize
 * @returns {Connector} a normalized connector
 */
const normalize = connector => {
  const axis = vec3.unit(connector.axis)
  // make the normal vector truly normal:
  const realNormal = vec3.unit(
    vec3.cross(connector.normal, connector.axis)
  )
  const normal = vec3.cross(axis, realNormal)
  return fromPointAxisNormal(connector.point, axis, normal)
}

module.exports = normalize
