const test = require('ava')
const { normalize, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: normalize() called with one paramerters should return a vec2 with correct values', (t) => {
  const obs1 = normalize([0, 0])
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = normalize([1, 2])
  t.true(compareVectors(obs2, [0.4472135901451111, 0.8944271802902222]))

  const obs3 = normalize([-1, -2])
  t.true(compareVectors(obs3, [-0.4472135901451111, -0.8944271802902222]))

  const obs4 = normalize([-1, 2])
  t.true(compareVectors(obs4, [-0.4472135901451111, 0.8944271802902222]))
})

test('vec2: normalize() called with two paramerters should update a vec2 with correct values', (t) => {
  const obs1 = fromValues(0, 0)
  const ret1 = normalize(obs1, [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = normalize(obs2, [1, 2])
  t.true(compareVectors(obs2, [0.4472135901451111, 0.8944271802902222]))
  t.true(compareVectors(ret2, [0.4472135901451111, 0.8944271802902222]))

  const obs3 = fromValues(0, 0)
  const ret3 = normalize(obs3, [-1, -2])
  t.true(compareVectors(obs3, [-0.4472135901451111, -0.8944271802902222]))
  t.true(compareVectors(ret3, [-0.4472135901451111, -0.8944271802902222]))

  const obs4 = fromValues(0, 0)
  const ret4 = normalize(obs4, [-1, 2])
  t.true(compareVectors(obs4, [-0.4472135901451111, 0.8944271802902222]))
  t.true(compareVectors(ret4, [-0.4472135901451111, 0.8944271802902222]))

  const obs5 = fromValues(0, 0)
  const ret5 = normalize(obs5, [0.5, 1.5])
  t.true(compareVectors(obs5, [0.3162277638912201, 0.9486833214759827]))
  t.true(compareVectors(ret5, [0.3162277638912201, 0.9486833214759827]))

  const obs6 = fromValues(0, 0)
  const ret6 = normalize(obs6, [0.5, 0.5])
  t.true(compareVectors(obs6, [0.7071067690849304, 0.7071067690849304]))
  t.true(compareVectors(ret6, [0.7071067690849304, 0.7071067690849304]))
})
