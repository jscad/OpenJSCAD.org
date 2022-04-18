const test = require('ava')

const { comparePoints } = require('../../../test/helpers')
const { geom3 } = require('../../geometries')
const { measureBoundingBox, measureAggregateBoundingBox } = require('../../measurements')
const { cube } = require('../../primitives')

const { align } = require('./index')

test('align: single object returns geometry unchanged if all axes are none', (t) => {
  const original = cube({ size: 4, center: [10, 10, 10] })
  const aligned = align({ modes: ['none', 'none', 'none'] }, original)
  const bounds = measureBoundingBox(aligned)
  const expectedBounds = [[8, 8, 8], [12, 12, 12]]
  t.notThrows(() => geom3.validate(aligned))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: single objects returns geometry aligned, different modes on each axis', (t) => {
  const original = cube({ size: 4, center: [10, 10, 10] })
  const aligned = align({ modes: ['center', 'min', 'max'] }, original)
  const bounds = measureBoundingBox(aligned)
  const expectedBounds = [[-2, 0, -4], [2, 4, 0]]
  t.notThrows(() => geom3.validate(aligned))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: unfilled modes and relativeTo arrays return results with expected values', (t) => {
  const original = cube({ size: 4, center: [10, 10, 10] })
  const aligned = align({ modes: ['center'], relativeTo: [0] }, original)
  const bounds = measureBoundingBox(aligned)
  const expectedBounds = [[-2, 8, 8], [2, 12, 12]]
  t.notThrows(() => geom3.validate(aligned))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: multiple objects grouped returns geometry aligned, different modes on each axis', (t) => {
  const original = [
    cube({ size: 4, center: [10, 10, 10] }),
    cube({ size: 2, center: [4, 4, 4] })
  ]
  const aligned = align({ modes: ['center', 'min', 'max'], relativeTo: [6, -10, 0], grouped: true }, original)
  const bounds = measureAggregateBoundingBox(aligned)
  const expectedBounds = [[1.5, -10, -9], [10.5, -1, 0]]
  t.notThrows(() => geom3.validate(aligned[0]))
  t.notThrows(() => geom3.validate(aligned[1]))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: multiple objects ungrouped returns geometry aligned, different modes on each axis', (t) => {
  const original = [
    cube({ size: 4, center: [10, 10, 10] }),
    cube({ size: 2, center: [4, 4, 4] })
  ]
  const aligned = align({ modes: ['center', 'min', 'max'], relativeTo: [30, 30, 30] }, original)
  const bounds = measureAggregateBoundingBox(aligned)
  const expectedBounds = [[28, 30, 26], [32, 34, 30]]
  t.notThrows(() => geom3.validate(aligned[0]))
  t.notThrows(() => geom3.validate(aligned[1]))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: multiple objects grouped, relativeTo is nulls, returns geometry unchanged', (t) => {
  const original = [
    cube({ size: 4, center: [10, 10, 10] }),
    cube({ size: 2, center: [4, 4, 4] })
  ]
  const aligned = align({ modes: ['center', 'min', 'max'], relativeTo: [null, null, null], grouped: true }, original)
  const bounds = measureAggregateBoundingBox(aligned)
  const expectedBounds = [[3, 3, 3], [12, 12, 12]]
  t.notThrows(() => geom3.validate(aligned[0]))
  t.notThrows(() => geom3.validate(aligned[1]))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: multiple objects ungrouped, relativeTo is nulls, returns geometry aligned to group bounds', (t) => {
  const original = [
    cube({ size: 2, center: [4, 4, 4] }),
    cube({ size: 4, center: [10, 10, 10] })
  ]
  const aligned = align({ modes: ['center', 'min', 'max'], relativeTo: [null, null, null], grouped: false }, original)
  const bounds = measureAggregateBoundingBox(aligned)
  const expectedBounds = [[5.5, 3, 8], [9.5, 7, 12]]
  t.notThrows(() => geom3.validate(aligned[0]))
  t.notThrows(() => geom3.validate(aligned[1]))
  t.true(comparePoints(bounds, expectedBounds), 'Bounding box was not as expected. Result: ' + JSON.stringify(bounds))
})

test('align: throws errors on bad options', (t) => {
  const aCube = cube({ size: 4, center: [10, 10, 10] })
  t.throws(() => align({ grouped: 3 }, aCube), { instanceOf: Error })
  t.throws(() => align({ relativeTo: [3, 4, 9, 12] }, aCube), { instanceOf: Error })
  t.throws(() => align({ relativeTo: [3, 4, 'dog'] }, aCube), { instanceOf: Error })
  t.throws(() => align({ modes: ['center', 'max', 'james'] }, aCube), { instanceOf: Error })
  t.throws(() => align({ modes: ['center', 'max', 'min', 'none'] }, aCube), { instanceOf: Error })
})
