import test from 'ava'

import { cube, cuboid } from '../primitives/index.js'

import { measureAggregateVolume } from './index.js'

test('measureAggregateVolume (single objects)', (t) => {
  const aCube = cube({ size: 4, center: [4, 10, 20] })
  const volume = measureAggregateVolume(aCube)
  t.is(volume, 64)
})

test('measureAggregateVolume (multiple objects)', (t) => {
  const cube1 = cube({ size: 4, center: [4, -10, 20] })
  const cuboid2 = cuboid({ size: [1, 4, 10], center: [0, -20, 20] })

  let volume = measureAggregateVolume(cube1, cuboid2)
  t.is(volume, 104)

  volume = measureAggregateVolume([cube1, cuboid2])
  t.is(volume, 104)
})
