const vec3 = require('../maths/vec3')

/**
 * Create a new connector.
 * A connector allows two objects to be connected at predefined positions.
 *
 * For example a servo motor and a servo horn can both have a connector called 'shaft'.
 * The horn can be moved and rotated to any position, and then the servo horn
 * is attached to the servo motor at the proper position, such that the two connectors match.
 * Connectors are children of the solid, transform-wise, so transformations are applied
 * to both solid and connector(s).  (parent => child relationship)
 *
 * @property {vec3} point - the position of the connector (relative to its parent)
 * @property {vec3} axis - the direction (unit vector) of the connector
 * @property {vec3} normal - the direction (unit vector) perpendicular to axis, that defines the "12 o'clock" orientation of the connector
 * @alias module:modeling/connectors.create
 *
 * @example
 * let myconnector = create()
 */
const create = () => ({ point: vec3.create(), axis: vec3.clone([0, 0, 1]), normal: vec3.clone([1, 0, 0]) })

module.exports = create
