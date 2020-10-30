import { expectType, expectNotType, expectError } from 'tsd'

import Geom2 from './type'
import create from './create'

expectType(create())
expectType<Geom2>(create([]))
expectType<Geom2>(
  create(
    [
      [[0, 0], [1, 1]],
      [[1, 1], [2, 2]]
    ]
  )
)
expectError(create([null]))
expectNotType<
  Parameters<typeof create>[0]
>(
  [
    [[0, 0, 0], [1, 1, 1]],
    [[1, 1, 1], [2, 2, 2]]
  ]
)
