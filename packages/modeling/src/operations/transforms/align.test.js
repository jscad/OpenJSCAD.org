const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')
const { measureBoundingBox, measureAggregateBoundingBox } = require('../../measurements')
const { geom2, geom3, path2 } = require('../../geometries')
const { cube } = require('../../primitives')

const { align, center, centerX, centerY, centerZ } = require('./index')

test('align: single object returns geometry unchanged if all axes are none', (t) => {
  const original = cube({ size: 4, center: [10, 10, 10] })
  const aligned = align({ modes: ['none', 'none', 'none'] }, original)
  const bounds = measureBoundingBox(aligned)
  const expectedBounds = [[8, 8, 8], [12, 12, 12]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('align: single objects returns geometry aligned, different modes on each axis', (t) => {
  const original = cube({ size: 4, center: [10, 10, 10] })
  const aligned = align({ modes: ['center', 'lower', 'upper'] }, original)
  const bounds = measureBoundingBox(aligned)
  const expectedBounds = [[-2, 0, -4], [2, 4, 0]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})

test('align: multiple objects grouped returns geometry aligned, different modes on each axis', (t) => {
  const original = [
      cube({ size: 4, center: [10, 10, 10] }),
      cube({ size: 2, center: [4, 4, 4] }),
    ]
  const aligned = align({ modes: ['center', 'lower', 'upper'], alignTo:[6,-10,0], grouped: true }, original)
  const bounds = measureAggregateBoundingBox(aligned)
  const expectedBounds =  [[1.5,-19,0],[10.5,-10,9]]
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected: ' + JSON.stringify(bounds))
})
