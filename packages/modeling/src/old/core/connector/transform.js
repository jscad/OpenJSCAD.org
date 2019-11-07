const fromPointAxisNormal = require('./fromPointAxisNormal')

/** Transform a connector by a 4x4 matrix
 * @param {Mat4} matrix a 4x4 connector
 * @param {Connector} connector the connector to transform
 * @returns {Connector} a normalized connector
 */
const transform = (matrix, connector) => {
  const point = vec3.transform(matrix, connector.point)
  const axis = vec3.subtract(
    vec3.transform(
      matrix,
      vec3.add(connector.point, connector.axis)
    ),
    point
  )
  const normal = vec3.subtract(
    vec3.transform(
      matrix,
      vec3.add(connector.point, connector.normal)
    ),
    point)
  return fromPointAxisNormal(point, axis, normal)
}