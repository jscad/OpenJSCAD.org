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

test('2D geometry to JSON', (t) => {
  const geom1 = primitives.rectangle()

  const obs1 = serialize({}, geom1)
  t.is(countOf('sides', obs1[0]), 1)
  t.is(countOf('transforms', obs1[0]), 1)
  t.is(countOf('[', obs1[0]), 15)
  t.is(countOf(']', obs1[0]), 15)
  t.is(countOf(',', obs1[0]), 31)

  const geom2 = primitives.circle({ segments: 16 })

  const obs2 = serialize({}, geom2)
  t.is(countOf('sides', obs2[0]), 1)
  t.is(countOf('transforms', obs2[0]), 1)
  t.is(countOf('[', obs2[0]), 51)
  t.is(countOf(']', obs2[0]), 51)
  t.is(countOf(',', obs2[0]), 79)

  const obs3 = serialize({}, geom1, geom2)
  t.is(countOf('sides', obs3[0]), 2)
  t.is(countOf('transforms', obs3[0]), 2)
  t.is(countOf('[', obs3[0]), 65)
  t.is(countOf(']', obs3[0]), 65)
  t.is(countOf(',', obs3[0]), 111)
})
