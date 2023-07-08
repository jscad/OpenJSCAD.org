import { expectType, expectNotType, expectError } from 'tsd'

import { geometries } from './'
import { Geom2 } from './geometries/types'

const { geom2 } = geometries

expectType(geom2.create())
expectType<Geom2>(geom2.create([]))
expectType<Geom2>(
  geom2.create(
    [
      [[0, 0], [1, 1]],
      [[1, 1], [2, 2]]
    ]
  )
)
expectError(geom2.create([null]))
expectNotType<
  Parameters<typeof geom2.create>[0]
>(
  [
    [[0, 0, 0], [1, 1, 1]],
    [[1, 1, 1], [2, 2, 2]]
  ]
)
