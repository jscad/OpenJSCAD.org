const test = require('ava')

const { create } = require('./index')

test('poly2: create() should return a poly2 with initial values', (t) => {
  let obs = create()
  let exp = { vertices: [] }
  t.deepEqual(obs, exp)

  obs = create([[1, 1], [2, 2], [3, 3]])
  exp = { vertices: [[1, 1], [2, 2], [3, 3]] }
  t.deepEqual(obs, exp)
})
