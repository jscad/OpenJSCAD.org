const transform = require('./transform')

/**
 * Connect a solid to another solid, such that two Connectors become connected
 * @param  {Connector} connector a Connector of this solid
 * @param  {Connector} otherConnector a Connector to which myConnector should be connected
 * @param  {Boolean} mirror false: the 'axis' vectors of the connectors should point in the same direction
 * true: the 'axis' vectors of the connectors should point in opposite direction
 * @param  {Float} normalrotation degrees of rotation between the 'normal' vectors of the two
 * connectors
 * @returns {Shape3} this csg, tranformed accordingly
 */
function connectTo (shape3, connector, otherConnector, mirror, normalrotation) {
  let matrix = connector.getTransformationTo(otherConnector, mirror, normalrotation)
  return transform(matrix, shape3)
}

module.exports = connectTo
