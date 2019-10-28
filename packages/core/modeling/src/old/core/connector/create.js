const vec3 = require('../math/vec3')

/**
 * @typedef {Object} Connector - a connector
 * @property {vec3} point the position of the connector (relative to its parent)
 * @property {vec3} axis the direction vector of the connection (in the case of the servo motor example it would point in the direction of the shaft)
 * @property {vec3} normal direction vector somewhat perpendicular to axis; this defines the "12 o'clock" orientation of the connection.
 */

/** Create a Connector
 * A connector allows to attach two objects at predefined positions
 * For example a servo motor and a servo horn:
 * Both can have a Connector called 'shaft'
 * The horn can be moved and rotated such that the two connectors match
 * and the horn is attached to the servo motor at the proper position.
 * Connectors are children of the solid, transform wise (parent => child relationship)
 * so they get the same transformations applied as the solid
 * @returns {Connector} a new connector
 */

const create = () => {
  return {
    point: vec3.create(),
    axis: vec3.unit(vec3.create()),
    normal: vec3.unit(vec3.create())
  }
}

module.exports = create
