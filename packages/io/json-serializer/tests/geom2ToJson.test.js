import test from 'ava'

import { primitives } from '@jscad/modeling'

import { serialize } from '../src/index.js'

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('2D geometry to JSON', (t) => {
  const geom1 = primitives.rectangle()

  const obs1 = serialize({}, geom1)
  t.is(countOf('outlines', obs1[0]), 1)
  t.is(countOf('transforms', obs1[0]), 1)
  t.is(countOf('[', obs1[0]), 8)
  t.is(countOf(']', obs1[0]), 8)
  t.is(countOf(',', obs1[0]), 23)

  const geom2 = primitives.circle({ segments: 16 })

  const obs2 = serialize({}, geom2)
  t.is(countOf('outlines', obs2[0]), 1)
  t.is(countOf('transforms', obs2[0]), 1)
  t.is(countOf('[', obs2[0]), 20)
  t.is(countOf(']', obs2[0]), 20)
  t.is(countOf(',', obs2[0]), 47)

  const obs3 = serialize({}, geom1, geom2)
  t.is(countOf('outlines', obs3[0]), 2)
  t.is(countOf('transforms', obs3[0]), 2)
  t.is(countOf('[', obs3[0]), 27)
  t.is(countOf(']', obs3[0]), 27)
  t.is(countOf(',', obs3[0]), 71)
})
