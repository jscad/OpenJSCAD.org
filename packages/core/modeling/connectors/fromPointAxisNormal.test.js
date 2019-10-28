const test = require('ava')

const { fromPointAxisNormal, toString } = require('./index')

const { compareVectors } = require('../../test/helpers/')

test('connector: fromPointAxisNormal() should return a new connector with correct values', (t) => {
  let obs = fromPointAxisNormal([0, 0, 0], [1, 0, 0], [0, 1, 0])
  t.true(compareVectors(obs.point, [0, 0, 0]))
  t.true(compareVectors(obs.axis, [1, 0, 0]))
  t.true(compareVectors(obs.normal, [0, 1, 0]))

  obs = fromPointAxisNormal([0, 0, 0], [0, 2, 0], [0, 0, 4])
  t.true(compareVectors(obs.point, [0, 0, 0]))
  t.true(compareVectors(obs.axis, [0, 1, 0]))
  t.true(compareVectors(obs.normal, [0, 0, 1]))

  obs = fromPointAxisNormal([5, 5, 5], [0, 0, 10], [0, 10, 5])
  t.true(compareVectors(obs.point, [5, 5, 5]))
  t.true(compareVectors(obs.axis, [0, 0, 1]))
  t.true(compareVectors(obs.normal, [0, 0.8944271802902222, 0.4472135901451111]))

  const str = toString(obs)
  // console.log(toString(obs))
})
