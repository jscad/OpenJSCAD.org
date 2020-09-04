const test = require('ava')

const { cube } = require('../primitives')
const measureAggregateBoundingBox = require('./measureAggregateBoundingBox')

test('measureAggregateBoundingBox (single objects)', (t) => {
  const aCube = cube({ size: 4, center: [4, 10, 20] })
  const bounds = measureAggregateBoundingBox(aCube)
  t.deepEqual(bounds, [[2, 8, 18], [6, 12, 22]], 'Bounds were not as expected: ' + JSON.stringify(bounds))
})

test('measureAggregateBoundingBox (multiple objects)', (t) => {
  const cube1 = cube({ size: 4, center: [4, 10, 20] })
  const cube2 = cube({ size: 6, center: [0, 20, 20] })

  const expectedBounds = [[-3, 8, 17], [6, 23, 23]]
  let bounds = measureAggregateBoundingBox(cube1, cube2)
  t.deepEqual(bounds, expectedBounds, 'Bounds were not as expected: ' + JSON.stringify(bounds))

  bounds = measureAggregateBoundingBox([cube1, cube2])
  t.deepEqual(bounds, expectedBounds, 'Bounds were not as expected: ' + JSON.stringify(bounds))
})
