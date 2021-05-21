const test = require('ava')

const { create } = require('./index')

test('create: Creates an empty geom2', (t) => {
  const expected = {
    sides: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom2', (t) => {
  const sides = [[[0, 0], [1, 1]]]
  const expected = {
    sides: sides,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(sides), expected)
})
