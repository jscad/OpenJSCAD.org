const test = require('ava')

const geom3 = require('../geometries/geom3')
const measureBoundingBox = require('../measurements/measureBoundingBox')
const { TAU } = require('../maths/constants')

const comparePoints = require('../../test/helpers/comparePoints')

const { torus } = require('./index')

test('torus (defaults)', (t) => {
  const obs = torus()
  const pts = geom3.toPoints(obs)

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 2048) // 32 * 32 * 2 (polys/segment) = 2048

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5, -5, -1], [5, 5, 1]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (simple options)', (t) => {
  const obs = torus({ innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8 })
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 64) // 4 * 8 * 2 (polys/segment) = 64

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5.5, -5.5, -0.5], [5.5, 5.5, 0.5]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (complex options)', (t) => {
  const obs = torus({ innerRadius: 1, outerRadius: 5, innerSegments: 32, outerSegments: 72, startAngle: TAU / 4, outerRotation: TAU / 4 })
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 1212)

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-6, 0, -1], [0, 6, 1]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (startAngle)', (t) => {
  const obs = torus({ startAngle: 1, endAngle: 1 + TAU })
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 2048)
})

test('torus (square by square)', (t) => {
  const obs = torus({ innerSegments: 4, outerSegments: 4, innerRotation: TAU / 4 })

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5, -5, -1], [5, 5, 1]]
  t.notThrows(() => geom3.validate(obs))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})
