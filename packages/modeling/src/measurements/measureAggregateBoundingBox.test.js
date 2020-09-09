const test = require('ava')

const { cube } = require('../primitives')
const measureAggregateBoundingBox = require('./measureAggregateBoundingBox')
const measureBoundingBox = require('./measureBoundingBox')

test('measureAggregateBoundingBox (single objects)', (t) => {
  const aCube = cube({ size: 4, center: [4, 10, 20] })
  const bounds = measureAggregateBoundingBox(aCube)
  t.deepEqual(bounds, [[2, 8, 18], [6, 12, 22]], 'Bounds were not as expected')
})

test('measureAggregateBoundingBox (multiple objects)', (t) => {
  const cube1 = cube({ size: 4, center: [4, -10, 20] })
  const cube2 = cube({ size: 6, center: [0, -20, 20] })

  const expectedBounds = [[-3, -23, 17], [6, -8, 23]]
  let bounds = measureAggregateBoundingBox(cube1, cube2)

  t.deepEqual(bounds, expectedBounds, 'Bounds were not as expected')

  bounds = measureAggregateBoundingBox([cube1, cube2])
  t.deepEqual(bounds, expectedBounds, 'Bounds were not as expected')
})

test('measureAggregateBoundingBox (multiple objects) does not change original bounds', (t) => {
  const cube1 = cube({ size: 4, center: [4, 10, 20] })
  const cube2 = cube({ size: 6, center: [0, 20, 20] })

  const objectBoundsBefore = JSON.stringify(measureBoundingBox(cube1, cube2))
  measureAggregateBoundingBox(cube1, cube2)
  const objectBoundsAfter = JSON.stringify(measureBoundingBox(cube1, cube2))

  t.is(objectBoundsBefore, objectBoundsAfter, 'Individual object bounds were not changed by the operation.')
})
