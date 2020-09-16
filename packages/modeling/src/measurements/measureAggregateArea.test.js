const test = require('ava')

const { cube, cuboid } = require('../primitives')
const measureAggregateArea = require('./measureAggregateArea')

test('measureAggregateArea (single objects)', (t) => {
  const aCube = cube({ size: 4, center: [4, 10, 20] })
  const area = measureAggregateArea(aCube)
  t.is(area, 4 * 4 * 6)
})

test('measureAggregateArea (multiple objects)', (t) => {
  const cube1 = cube({ size: 4, center: [4, -10, 20] })
  const cuboid2 = cuboid({ size: [1, 4, 10], center: [0, -20, 20] })

  const expectedArea = (4 * 4 * 6) + (2 * (1 * 4 + 1 * 10 + 4 * 10))
  let volume = measureAggregateArea(cube1, cuboid2)
  t.is(volume, expectedArea)

  volume = measureAggregateArea([cube1, cuboid2])
  t.is(volume, expectedArea)
})
