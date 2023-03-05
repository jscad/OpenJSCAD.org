import * as mat4 from '../maths/mat4/index.js'
import * as plane from '../maths/plane/index.js'
import * as vec2 from '../maths/vec2/index.js'
import * as vec3 from '../maths/vec3/index.js'

import { OrthonormalFormula } from '../maths/utils/index.js'

import { transform } from './transform.js'

/**
 * Get the transformation matrix that connects the given connectors.
 * @param {Object} options
 * @param {Boolean} [options.mirror=false] - the 'axis' vectors should point in the same direction
 *  true: the 'axis' vectors should point in opposite direction
 * @param {Number} [options.normalRotation=0] - the angle (RADIANS) of rotation between the 'normal' vectors
 * @param {connector} from - connector from which to connect
 * @param {connector} to - connector to connect to
 * @returns {mat4} - the matrix that transforms (connects) one connector to another
 * @alias module:modeling/connectors.transformationBetween
 */
export const transformationBetween = (options, from, to) => {
  const defaults = {
    mirror: false,
    normalRotation: 0
  }
  // mirror = !!mirror
  const { mirror, normalRotation } = Object.assign({}, defaults, options)

  // shift to the 0,0 origin
  const matrix = mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), from.point))

  // align the axis
  const axesPlane = plane.fromPointsRandom(plane.create(), vec3.create(), from.axis, to.axis)
  const axesBasis = new OrthonormalFormula(axesPlane)

  let angle1 = vec2.angleRadians(axesBasis.to2D(from.axis))
  let angle2 = vec2.angleRadians(axesBasis.to2D(to.axis))

  let rotation = angle2 - angle1
  if (mirror) rotation += Math.PI // 180 degrees

  // TODO: understand and explain this
  mat4.multiply(matrix, matrix, axesBasis.getProjectionMatrix())
  mat4.multiply(matrix, matrix, mat4.fromZRotation(mat4.create(), rotation))
  mat4.multiply(matrix, matrix, axesBasis.getInverseProjectionMatrix())
  const usAxesAligned = transform(matrix, from)
  // Now we have done the transformation for aligning the axes.

  // align the normals
  const normalsPlane = plane.fromNormalAndPoint(plane.create(), to.axis, vec3.create())
  const normalsBasis = new OrthonormalFormula(normalsPlane)

  angle1 = vec2.angleRadians(normalsBasis.to2D(usAxesAligned.normal))
  angle2 = vec2.angleRadians(normalsBasis.to2D(to.normal))

  rotation = angle2 - angle1 + normalRotation

  mat4.multiply(matrix, matrix, normalsBasis.getProjectionMatrix())
  mat4.multiply(matrix, matrix, mat4.fromZRotation(mat4.create(), rotation))
  mat4.multiply(matrix, matrix, normalsBasis.getInverseProjectionMatrix())

  // translate to the destination point
  mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), to.point))

  return matrix
}
