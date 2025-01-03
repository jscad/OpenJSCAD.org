import { TAU } from '../maths/constants.js'

import { extrudeRotate } from '../operations/extrusions/extrudeRotate.js'
import { rotate } from '../operations/transforms/rotate.js'
import { translate } from '../operations/transforms/translate.js'

import { circle } from './circle.js'

import { isGT, isGTE } from './commonChecks.js'

/**
 * Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.
 * @param {object} [options] - options for construction
 * @param {number} [options.innerRadius=1] - radius of small (inner) circle
 * @param {number} [options.outerRadius=4] - radius of large (outer) circle
 * @param {number} [options.innerSegments=32] - number of segments to create per rotation
 * @param {number} [options.outerSegments=32] - number of segments to create per rotation
 * @param {number} [options.innerRotation=0] - rotation of small (inner) circle in radians
 * @param {number} [options.outerRotation=TAU] - rotation (outer) of the torus (RADIANS)
 * @param {number} [options.startAngle=0] - start angle of the torus (RADIANS)
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.torus
 *
 * @example
 * let myshape = torus({ innerRadius: 10, outerRadius: 100 })
 */
export const torus = (options) => {
  const defaults = {
    innerRadius: 1,
    innerSegments: 32,
    outerRadius: 4,
    outerSegments: 32,
    innerRotation: 0,
    startAngle: 0,
    outerRotation: TAU
  }
  const { innerRadius, innerSegments, outerRadius, outerSegments, innerRotation, startAngle, outerRotation } = Object.assign({}, defaults, options)

  if (!isGT(innerRadius, 0)) throw new Error('innerRadius must be greater than zero')
  if (!isGTE(innerSegments, 3)) throw new Error('innerSegments must be three or more')
  if (!isGT(outerRadius, 0)) throw new Error('outerRadius must be greater than zero')
  if (!isGTE(outerSegments, 3)) throw new Error('outerSegments must be three or more')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGT(outerRotation, 0)) throw new Error('outerRotation must be greater than zero')

  if (innerRadius >= outerRadius) throw new Error('inner circle is too large to rotate about the outer circle')

  let innerCircle = circle({ radius: innerRadius, segments: innerSegments })

  if (innerRotation !== 0) {
    innerCircle = rotate([0, 0, innerRotation], innerCircle)
  }

  innerCircle = translate([outerRadius, 0], innerCircle)

  const extrudeOptions = {
    startAngle: startAngle,
    angle: outerRotation,
    segments: outerSegments
  }
  return extrudeRotate(extrudeOptions, innerCircle)
}
