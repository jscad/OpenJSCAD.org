const test = require('ava')

const { fromPoints, toString } = require('./index')

test('slice: fromPoints() should return a new slice with correct values', (t) => {
  const exp1 = {
    edges: [
      [new Float32Array([1, 1, 0]), new Float32Array([0, 0, 0])],
      [new Float32Array([0, 0, 0]), new Float32Array([1, 0, 0])],
      [new Float32Array([1, 0, 0]), new Float32Array([1, 1, 0])]
    ]
  }
  const obs1 = fromPoints([[0, 0], [1, 0], [1, 1]])
  t.deepEqual(obs1, exp1)

  const str1 = toString(obs1)
})
