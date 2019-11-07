const mat4 = require('../math/mat4')
const vec2 = require('../math/vec2')
const vec3 = require('../math/vec3')
const plane = require('../math/plane')
const OrthoNormalBasis = require('../math/OrthoNormalBasis')
const transform = require('./transform')
const normalize = require('./normalize')

/** Get the transformation matrix to connect this Connector to another connector
 * @param  {Object} params
 * @param  {Boolean} params.mirror=false the 'axis' vectors of the connectors should point in the same direction
 *  true: the 'axis' vectors of the connectors should point in opposite direction
 * @param  {Number} params.normalrotation=0 : degrees of rotation between the 'normal' vectors of the two connectors
 * @param  {Connector} from connector from which to connect
 * @param  {Connector} to connector to which the first connector should be connected
 */
const transformationBetweenConnectors = (params, from, to) => {
  const defaults = {
    mirror: false,
    normalrotation: 0
  }
  // mirror = !!mirror
  // normalrotation = normalrotation ? Number(normalrotation) : 0
  const { mirror, normalrotation } = Object.assign({}, defaults, params)
  const us = normalize(from)
  const other = normalize(to)
  // shift to the origin:
  let transformation = mat4.fromTranslation(vec3.negate(from.point))
  // construct the plane crossing through the origin and the two axes:
  let axesplane = plane.fromPointsRandom(vec3.create(), us.axis, other.axis)
  let axesbasis = new OrthoNormalBasis(axesplane)

  let angle1 = vec2.angleRadians(axesbasis.to2D(us.axis))
  let angle2 = vec2.angleRadians(axesbasis.to2D(other.axis))
  let rotation = 180.0 * (angle2 - angle1) / Math.PI // TODO: switch back to radians
  if (mirror) rotation += 180.0
  // TODO: understand and explain this
  transformation = mat4.multiply(transformation, axesbasis.getProjectionMatrix())
  transformation = mat4.multiply(transformation, mat4.fromZRotation(rotation))
  transformation = mat4.multiply(transformation, axesbasis.getInverseProjectionMatrix())
  let usAxesAligned = transform(transformation, us)
  // Now we have done the transformation for aligning the axes.
  // We still need to align the normals:
  let normalsplane = plane.fromNormalAndPoint(other.axis, vec3.create())
  let normalsbasis = new OrthoNormalBasis(normalsplane)
  angle1 = vec2.angleRadians(normalsbasis.to2D(usAxesAligned.normal))
  angle2 = vec2.angleRadians(normalsbasis.to2D(other.normal))
  rotation = 180.0 * (angle2 - angle1) / Math.PI
  rotation += normalrotation
  transformation = mat4.multiply(transformation, normalsbasis.getProjectionMatrix())
  transformation = mat4.multiply(transformation, mat4.fromZRotation(rotation))
  transformation = mat4.multiply(transformation, normalsbasis.getInverseProjectionMatrix())
  // and translate to the destination point:
  transformation = mat4.multiply(transformation, mat4.fromTranslation(other.point))
  // let usAligned = us.transform(transformation);
  return transformation
  // alternativeNaming ?
  // mat4.fromConnectorPair(params, from, to)
}

module.exports = transformationBetweenConnectors
