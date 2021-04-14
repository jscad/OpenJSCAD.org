const mat4 = require('../maths/mat4')
const plane = require('../maths/plane')
const vec2 = require('../maths/vec2')
const vec3 = require('../maths/vec3')

const OrthoNormalBasis = require('../maths/OrthoNormalBasis')

const transform = require('./transform')

/**
 * Get the transformation matrix that connects the given connectors.
 * @param {Object} options
 * @param {Boolean} [options.mirror=false] - the 'axis' vectors should point in the same direction
 *  true: the 'axis' vectors should point in opposite direction
 * @param {Number} [options.normalRotation=0] - the angle (RADIANS) of rotation between the 'normal' vectors
 * @param {connector} from - connector from which to connect
 * @param {connector} to - connector to which to connected
 * @returns {mat4} - the matrix that transforms (connects) one connector to another
 * @alias module:modeling/connectors.transformationBetween
 */
const transformationBetween = (options, from, to) => {
  const defaults = {
    mirror: false,
    normalRotation: 0
  }
  // mirror = !!mirror
  const { mirror, normalRotation } = Object.assign({}, defaults, options)

  // shift to the 0,0 origin
  let matrix = mat4.fromTranslation(vec3.negate(from.point))

  // align the axis
  const axesplane = plane.fromPointsRandom(vec3.create(), from.axis, to.axis)
  const axesbasis = new OrthoNormalBasis(axesplane)

  let angle1 = vec2.angleRadians(axesbasis.to2D(from.axis))
  let angle2 = vec2.angleRadians(axesbasis.to2D(to.axis))

  let rotation = angle2 - angle1
  if (mirror) rotation += Math.PI // 180 degrees

  // TODO: understand and explain this
  matrix = mat4.multiply(matrix, axesbasis.getProjectionMatrix())
  matrix = mat4.multiply(matrix, mat4.fromZRotation(rotation))
  matrix = mat4.multiply(matrix, axesbasis.getInverseProjectionMatrix())
  const usAxesAligned = transform(matrix, from)
  // Now we have done the transformation for aligning the axes.

  // align the normals
  const normalsplane = plane.fromNormalAndPoint(to.axis, vec3.create())
  const normalsbasis = new OrthoNormalBasis(normalsplane)

  angle1 = vec2.angleRadians(normalsbasis.to2D(usAxesAligned.normal))
  angle2 = vec2.angleRadians(normalsbasis.to2D(to.normal))

  rotation = angle2 - angle1 + normalRotation

  matrix = mat4.multiply(matrix, normalsbasis.getProjectionMatrix())
  matrix = mat4.multiply(matrix, mat4.fromZRotation(rotation))
  matrix = mat4.multiply(matrix, normalsbasis.getInverseProjectionMatrix())

  // translate to the destination point
  matrix = mat4.multiply(matrix, mat4.fromTranslation(to.point))

  return matrix
}

module.exports = transformationBetween
