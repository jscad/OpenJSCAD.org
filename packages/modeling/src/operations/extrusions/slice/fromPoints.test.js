const test = require('ava')

const { fromPoints } = require('./index')

test('slice: fromPoints() should return a new slice with correct values', (t) => {
  const exp1 = {
    edges: [
      [[1, 1, 0], [0, 0, 0]],
      [[0, 0, 0], [1, 0, 0]],
      [[1, 0, 0], [1, 1, 0]]
    ]
  }
  const obs1 = fromPoints([[0, 0], [1, 0], [1, 1]])
  t.deepEqual(obs1, exp1)
})
