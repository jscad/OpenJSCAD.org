const vec3 = require('../maths/vec3')

const fromPointAxisNormal = require('./fromPointAxisNormal')

/*
 * Normalize the given connector, calculating new axis and normal
 * @param {connector} connector - the connector to normalize
 * @returns {connector} a new connector
 */
const normalize = (connector) => {
  const newaxis = vec3.normalize(connector.axis)

  // make the normal vector truly normal
  const newnormal = vec3.normalize(vec3.cross(connector.normal, connector.axis))
  vec3.cross(newnormal, newaxis, newnormal)

  return fromPointAxisNormal(connector.point, newaxis, newnormal)
}

module.exports = normalize
