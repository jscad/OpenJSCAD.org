const vec3 = require('../maths/vec3')

const fromPointAxisNormal = require('./fromPointAxisNormal')

/**
 * Transform the give connector using the given matrix.
 * @param {mat4} matrix - a transform matrix
 * @param {connector} connector - the connector to transform
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.transform
 */
const transform = (matrix, connector) => {
  const newpoint = vec3.transform(matrix, connector.point)
  const newaxis = vec3.subtract(
    vec3.transform(matrix, vec3.add(connector.point, connector.axis)),
    newpoint
  )
  const newnormal = vec3.subtract(
    vec3.transform(matrix, vec3.add(connector.point, connector.normal)),
    newpoint
  )
  return fromPointAxisNormal(newpoint, newaxis, newnormal)
}

module.exports = transform
