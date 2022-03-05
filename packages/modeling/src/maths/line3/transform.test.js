const test = require('ava')
const { transform, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: transform() called with three parameters should update a line3 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints(create(), [1, 0, 0], [0, 1, 0])
  const line3 = fromPoints(create(), [-3, -3, -3], [3, 3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  let ret1 = transform(obs1, line1, identityMatrix)
  t.true(compareVectors(ret1[0], [0, 0, 0]))
  t.true(compareVectors(ret1[1], [0, 0, 1]))
  t.true(compareVectors(obs1[0], [0, 0, 0]))
  t.true(compareVectors(obs1[1], [0, 0, 1]))
  t.not(line1, obs1)
  t.is(ret1, obs1)
  ret1 = transform(obs1, line2, identityMatrix)
  t.true(compareVectors(ret1[0], [1, 0, 0]))
  t.true(compareVectors(ret1[1], [-0.7071067811865475, 0.7071067811865475, 0]))
  t.true(compareVectors(obs1[0], [1, 0, 0]))
  t.true(compareVectors(obs1[1], [-0.7071067811865475, 0.7071067811865475, 0]))
  ret1 = transform(obs1, line3, identityMatrix)
  t.true(compareVectors(ret1[0], [-3, -3, -3]))
  t.true(compareVectors(ret1[1], [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
  t.true(compareVectors(obs1[0], [-3, -3, -3]))
  t.true(compareVectors(obs1[1], [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  // transform in place
  let ret2 = transform(line1, line1, translationMatrix)
  t.true(compareVectors(ret2[0], [1, 5, 7]))
  t.true(compareVectors(ret2[1], [0, 0, 1]))
  t.true(compareVectors(line1[0], [1, 5, 7]))
  t.true(compareVectors(line1[1], [0, 0, 1]))
  t.is(ret2, line1)
  ret2 = transform(line2, line2, translationMatrix)
  t.true(compareVectors(ret2[0], [2, 5, 7]))
  t.true(compareVectors(ret2[1], [-0.7071067811865474, 0.7071067811865478, 0]))
  t.true(compareVectors(line2[0], [2, 5, 7]))
  t.true(compareVectors(line2[1], [-0.7071067811865474, 0.7071067811865478, 0]))
  t.is(ret2, line2)
  ret2 = transform(line3, line3, translationMatrix)
  t.true(compareVectors(ret2[0], [-2, 2, 4]))
  t.true(compareVectors(ret2[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))
  t.true(compareVectors(line3[0], [-2, 2, 4]))
  t.true(compareVectors(line3[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))
  t.is(ret2, line3)
})
