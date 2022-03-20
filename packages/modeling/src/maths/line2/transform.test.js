const test = require('ava')
const { transform, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: transform() called with three parameters should update a line2 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints(create(), [0, 0], [0, 1])
  const line3 = fromPoints(create(), [-3, -3], [3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  let ret1 = transform(obs1, line1, identityMatrix)
  t.true(compareVectors(ret1, [0, 1, 0]))
  t.true(compareVectors(obs1, [0, 1, 0]))
  ret1 = transform(obs1, line2, identityMatrix)
  t.true(compareVectors(ret1, [-1, 0, 0]))
  t.true(compareVectors(obs1, [-1, 0, 0]))
  ret1 = transform(obs1, line3, identityMatrix)
  t.true(compareVectors(ret1, [-0.7071067811865476, 0.7071067811865476, 0]))
  t.true(compareVectors(obs1, [-0.7071067811865476, 0.7071067811865476, 0]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs2 = create()
  let ret2 = transform(obs2, line1, translationMatrix)
  t.true(compareVectors(ret2, [0, 1, 5]))
  t.true(compareVectors(obs2, [0, 1, 5]))
  ret2 = transform(obs2, line2, translationMatrix)
  t.true(compareVectors(ret2, [-1, 0, -1]))
  t.true(compareVectors(obs2, [-1, 0, -1]))
  ret2 = transform(obs2, line3, translationMatrix)
  t.true(compareVectors(ret2, [-0.7071067811865478, 0.7071067811865474, 2.828427124746189]))
  t.true(compareVectors(obs2, [-0.7071067811865478, 0.7071067811865474, 2.828427124746189]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs3 = create()
  let ret3 = transform(obs3, line1, scaleMatrix)
  t.true(compareVectors(ret3, [0, 1, 0]))
  t.true(compareVectors(obs3, [0, 1, 0]))
  ret3 = transform(obs3, line2, scaleMatrix)
  t.true(compareVectors(ret3, [-1, 0, 0]))
  t.true(compareVectors(obs3, [-1, 0, 0]))
  ret3 = transform(obs3, line3, scaleMatrix)
  t.true(compareVectors(ret3, [-0.9486832980505139, 0.316227766016838, 0]))
  t.true(compareVectors(obs3, [-0.9486832980505139, 0.316227766016838, 0]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), Math.sin(r), 0, 0,
    -Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs4 = create()
  let ret4 = transform(obs4, line1, rotateZMatrix)
  t.true(compareVectors(ret4, [-1, 0, 0]))
  t.true(compareVectors(obs4, [-1, 0, 0]))
  ret4 = transform(obs4, line2, rotateZMatrix)
  t.true(compareVectors(ret4, [0, -1, 0]))
  t.true(compareVectors(obs4, [0, -1, 0]))
  ret4 = transform(obs4, line3, rotateZMatrix)
  t.true(compareVectors(ret4, [-0.7071067811865476, -0.7071067811865476, -0]))
  t.true(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -0]))
})
