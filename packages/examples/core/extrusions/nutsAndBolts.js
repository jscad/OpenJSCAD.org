/**
 * Nuts and Bolts
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the advanced extrusion using slices to generate screw threads.
 * @tags extrude, slice, slices, extrudefromslices, callback
 * @authors platypii
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder } = jscad.primitives
const { subtract, union } = jscad.booleans
const { translate } = jscad.transforms
const { extrudeFromSlices, slice } = jscad.extrusions
const { sin, cos } = jscad.utils

const main = () => {
  const headHeight = 8
  const headRadius = 10
  const height = 32
  const threads = shaft({ height, rotations: Math.PI * 16, segments: 32, radius: 4, numberOfSlices: 100 })

  // generate bolt by attaching a head to the shaft
  const bolt = union(
    cylinder({ center: [0, 0, height + headHeight / 2], height: headHeight, radius: headRadius, segments: 6 }),
    threads
  )

  // generate nut by subtracting the shaft from a hex block
  const nut = subtract(
    cylinder({ center: [0, 0, headHeight / 2], height: headHeight, radius: headRadius, segments: 6 }),
    threads
  )

  return [
    bolt,
    translate([30, 0, 0], nut)
  ]
}

// generate a threaded shaft using extrudeFromSlices
const shaft = (options) => {
  const { height, rotations, segments, radius, numberOfSlices } = options
  return extrudeFromSlices({
    numberOfSlices,
    callback: (progress, index, base) => {
      // generate each slice manually
      const points = []
      for (let i = 0; i < segments; i++) {
        const pointAngle = Math.PI * 2 * i / segments
        const threadAngle = (rotations * progress) % (Math.PI * 2)
        const factor = Math.max(1, Math.min(1.4, 1.5 - 0.2 * angleDiff(threadAngle, pointAngle)))
        const x = radius * factor * cos(pointAngle)
        const y = radius * factor * sin(pointAngle)
        points.push([x, y, height * progress])
      }
      return slice.fromPoints(points)
    }
  }, {})
}

const angleDiff = (angle1, angle2) => {
  const diff = Math.abs((angle1 - angle2) % (Math.PI * 2))
  return diff > Math.PI ? Math.PI * 2 - diff : diff
}

module.exports = { main }
