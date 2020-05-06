/**
 * Return a string representing the given connector.
 *
 * @param {connector} connector - the connector of reference
 * @returns {string} string representation
 * @alias module:modeling/connectors.toString
 */
const toString = (connector) => {
  const point = connector.point
  const axis = connector.axis
  const normal = connector.normal
  return `connector: point: [${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(7)}],  axis: [${axis[0].toFixed(7)}, ${axis[1].toFixed(7)}, ${axis[2].toFixed(7)}], normal: [${normal[0].toFixed(7)}, ${normal[1].toFixed(7)}, ${normal[2].toFixed(7)}]`
}

module.exports = toString
