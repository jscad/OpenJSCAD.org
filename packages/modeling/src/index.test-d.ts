import { expectType, expectNotType, expectError, expectAssignable } from 'tsd'

import { geometries } from './'
import { snap, generalize } from './operations/modifiers'

const { geom2 } = geometries

expectAssignable<Function>(snap)
expectAssignable<Function>(generalize)
expectType(geom2.create())
expectType<geom2.Geom2>(geom2.create([]))
expectType<geom2.Geom2>(
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

