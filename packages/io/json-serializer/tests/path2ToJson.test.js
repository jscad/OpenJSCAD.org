const test = require('ava')

const { primitives } = require('@jscad/modeling')

const { serialize } = require('../index.js')

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('2D Path to JSON', (t) => {
  const path1 = primitives.arc({ center: [5, 5], endAngle: Math.PI / 4, segments: 16 })
  const obs1 = serialize({}, path1)
  t.is(countOf('points', obs1[0]), 1)
  t.is(countOf('transforms', obs1[0]), 1)
  t.is(countOf('[', obs1[0]), 7)
  t.is(countOf(']', obs1[0]), 7)
  t.is(countOf(',', obs1[0]), 24)

  const path2 = primitives.arc({ segments: 72 })
  const obs2 = serialize({}, path2)
  t.is(countOf('points', obs2[0]), 1)
  t.is(countOf('transforms', obs2[0]), 1)
  t.is(countOf('[', obs2[0]), 76)
  t.is(countOf(']', obs2[0]), 76)
  t.is(countOf(',', obs2[0]), 162)

  const obs3 = serialize({}, [path1, path2])
  t.is(countOf('points', obs3[0]), 2)
  t.is(countOf('transforms', obs3[0]), 2)
  t.is(countOf('[', obs3[0]), 82)
  t.is(countOf(']', obs3[0]), 82)
  t.is(countOf(',', obs3[0]), 187)
})
