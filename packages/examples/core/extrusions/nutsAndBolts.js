/**
 * Nuts and Bolts
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the advanced extrusion using slices to generate screw threads.
 * @tags extrude, slice, slices, extrudefromslices, callback
 * @authors platypii
 * @licence MIT License
 */

import { cylinder, extrudeFromSlices, slice, TAU } from '@jscad/modeling'
import { subtract, union, colorize, translate } from '@jscad/modeling'

const options = {
  hexWidth: 10,
  hexHeight: 8,
  threadLength: 32,
  threadSize: 4,
  innerRadius: 4,
  outerRadius: 5.6,
  slicesPerRevolution: 12,
  segments: 32
}

export const main = () => [
  colorize([0.9, 0.6, 0.2], bolt(options)),
  colorize([0.4, 0.4, 0.4], translate([30, 0, 0], nut(options)))
]

// generate bolt by attaching threads to a hex head
const bolt = (options) => union(
  translate([0, 0, options.threadLength], hex(options)),
  threads(options)
)

// generate nut by subtracting threads from a hex block
const nut = (options) => subtract(
  hex(options),
  threads({ ...options, threadLength: options.hexHeight })
)

// generate hexagonal block
const hex = (options) => {
  const radius = options.hexWidth * 1.1547005 // hexagon outer radius
  const height = options.hexHeight
  return cylinder({ center: [0, 0, height / 2], height, radius, segments: 6 })
}

// generate a threaded shaft using extrudeFromSlices
const threads = (options) => {
  const { innerRadius, outerRadius, segments, threadLength } = options
  const revolutions = threadLength / options.threadSize
  const numberOfSlices = options.slicesPerRevolution * revolutions
  return extrudeFromSlices({
    numberOfSlices,
    callback: (progress, index, base) => {
      // generate each slice manually
      const points = []
      for (let i = 0; i < segments; i++) {
        const pointAngle = TAU * i / segments
        const threadAngle = (TAU * revolutions * progress) % TAU

        // define the shape of the threads
        const phase = angleDiff(threadAngle, pointAngle) / TAU / 2
        const radius = lerp(innerRadius, outerRadius, 1.4 * phase - 0.2)

        const x = radius * Math.cos(pointAngle)
        const y = radius * Math.sin(pointAngle)
        points.push([x, y, threadLength * progress])
      }
      return slice.fromVertices(points)
    }
  }, {})
}

// linear interpolation with bounding
const lerp = (a, b, t) => Math.max(a, Math.min(b, a + (b - a) * t))

const angleDiff = (angle1, angle2) => {
  const diff = Math.abs((angle1 - angle2) % TAU)
  return diff > (TAU / 2) ? TAU - diff : diff
}
