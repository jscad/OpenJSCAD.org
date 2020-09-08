const test = require('ava')

const geom3 = require('../geometries/geom3')
const measureBoundingBox = require('../measurements/measureBoundingBox')
const comparePoints = require('../../test/helpers/comparePoints')

const { torus } = require('./index')

test('torus (defaults)', (t) => {
  const obs = torus()
  const pts = geom3.toPoints(obs)

  t.is(pts.length, 2048) // 32 * 32 * 2 (polys/segment) = 2048

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5, -5, -1], [5, 5, 1]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (Simple options)', (t) => {
  const obs = torus({ innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8 })
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 64) // 4 * 8 * 2 (polys/segment) = 64

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5.5, -5.5, -0.5], [5.5, 5.5, 0.5]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (complex options)', (t) => {
  const obs = torus({ innerRadius: 1, outerRadius: 5, innerSegments: 32, outerSegments: 72, startAngle: Math.PI / 2, outerRotation: Math.PI / 2 })
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 1154)

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-6, 0, -1], [0, 6, 1]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('torus (square by square)', (t) => {
  const obs = torus({ innerSegments: 4, outerSegments: 4, innerRotation: Math.PI / 2 })

  const bounds = measureBoundingBox(obs)
  const expectedBounds = [[-5, -5, -1], [5, 5, 1]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})
