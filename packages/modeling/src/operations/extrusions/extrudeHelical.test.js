const test = require('ava')
const { TAU } = require('../../maths/constants')
const { geom2, geom3 } = require('../../geometries')
const { circle } = require('../../primitives')

const { extrudeHelical } = require('./index')

test('extrudeHelical: (defaults) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  const geometry3 = extrudeHelical({}, geometry2)
  t.notThrows(() => geom3.validate(geometry3))
})

test('extrudeHelical: (defaults) extruding of a circle produces an expected geom3', (t) => {
  const geometry2 = circle({ size: 3, center: [10, 0] })

  const geometry3 = extrudeHelical({}, geometry2)
  t.notThrows(() => geom3.validate(geometry3))
})

test('extrudeHelical: (angle) extruding of a circle produces an expected geom3', (t) => {
  const maxRevolutions = 10
  const geometry2 = circle({ size: 3, center: [10, 0] })
  for (const index of [...Array(maxRevolutions).keys()]) {
    // also test negative angles
    const geometry3 = extrudeHelical({ angle: TAU * (index - maxRevolutions / 2) }, geometry2)
    t.notThrows(() => geom3.validate(geometry3))
  }
})

test('extrudeHelical: (pitch) extruding of a circle produces an expected geom3', (t) => {
  const startPitch = -10
  const geometry2 = circle({ size: 3, center: [10, 0] })
  for (const index of [...Array(20).keys()]) {
    // also test negative pitches
    const geometry3 = extrudeHelical({ pitch: startPitch + index }, geometry2)
    t.notThrows(() => geom3.validate(geometry3))
  }
})

test('extrudeHelical: (endRadiusOffset) extruding of a circle produces an expected geom3', (t) => {
  const startOffset = -5
  const geometry2 = circle({ size: 3, center: [10, 0] })
  for (const index of [...Array(10).keys()]) {
    // also test negative pitches
    const geometry3 = extrudeHelical({ endRadiusOffset: startOffset + index }, geometry2)
    t.notThrows(() => geom3.validate(geometry3))
  }
})

test('extrudeHelical: (segments) extruding of a circle produces an expected geom3', (t) => {
  const startSegments = 3
  const geometry2 = circle({ size: 3, center: [10, 0] })
  for (const index of [...Array(30).keys()]) {
    // also test negative pitches
    const geometry3 = extrudeHelical({ segments: startSegments + index }, geometry2)
    t.notThrows(() => geom3.validate(geometry3))
  }
})
