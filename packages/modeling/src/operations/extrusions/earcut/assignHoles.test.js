import test from 'ava'

import { subtract, union } from '../../../operations/booleans/index.js'
import { square } from '../../../primitives/index.js'

import assignHoles from './assignHoles.js'

test('slice: assignHoles() should return a polygon hierarchy', (t) => {
  const exp1 = [{
    solid: [
      [-3, -3],
      [3, -3],
      [3, 3],
      [-3, 3]
    ],
    holes: [[
      [-2, 2],
      [2, 2],
      [2, -2],
      [-2, -2]
    ]]
  }]
  const geometry = subtract(
    square({ size: 6 }),
    square({ size: 4 })
  )
  const obs1 = assignHoles(geometry)
  t.deepEqual(obs1, exp1)
})

test('slice: assignHoles() should handle nested holes', (t) => {
  const geometry = union(
    subtract(
      square({ size: 6 }),
      square({ size: 4 })
    ),
    subtract(
      square({ size: 10 }),
      square({ size: 8 })
    )
  )
  const obs1 = assignHoles(geometry)

  const exp1 = [
    {
      solid: [
        [-5, -5],
        [5, -5],
        [5, 5],
        [-5, 5]
      ],
      holes: [[
        [-4, 4],
        [4, 4],
        [4, -4],
        [-4, -4]
      ]]
    },
    {
      solid: [
        [-3, -3],
        [3, -3],
        [3, 3],
        [-3, 3]
      ],
      holes: [[
        [-2, 2],
        [2, 2],
        [2, -2],
        [-2, -2]
      ]]
    }
  ]
  t.deepEqual(obs1, exp1)
})
