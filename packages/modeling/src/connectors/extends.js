const vec3 = require('../maths/vec3')
const fromPointAxisNormal = require('./fromPointAxisNormal')

/*
 * Creates a new connector, with the connection point moved in the direction of the axis
 * @param {Number} distance the distance to extend the connector to
 * @param {connector} connector the connector to extend
 * @returns {connector} a normalized connector
 */
const extend = (distance, connector) => {
  const newpoint = vec3.add(connector.point, vec3.scale(distance, vec3.normalize(connector.axis)))
  return fromPointAxisNormal(newpoint, connector.axis, connector.normal)
}

module.exports = extend
