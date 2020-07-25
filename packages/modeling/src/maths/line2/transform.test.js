const test = require('ava')
const { transform, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: transform() called with two paramerters should return a line2 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints([0, 0], [0, 1])
  const line3 = fromPoints([-3, -3], [3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs1 = transform(identityMatrix, line1)
  t.true(compareVectors(obs1, [0, 1, 0]))
  obs1 = transform(identityMatrix, line2)
  t.true(compareVectors(obs1, [-1, 0, 0]))
  obs1 = transform(identityMatrix, line3)
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

  let obs2 = transform(translationMatrix, line1)
  t.true(compareVectors(obs2, [0, 1, 5]))
  obs2 = transform(translationMatrix, line2)
  // t.true(compareVectors(obs2, [-1, 0, -1], 1e-15))
  obs2 = transform(translationMatrix, line3)
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

  let obs3 = transform(scaleMatrix, line1)
  // rounding t.true(compareVectors(obs3, [0, 1, 0]))
  obs3 = transform(scaleMatrix, line2)
  t.true(compareVectors(obs3, [-1, 0, 0]))
  obs3 = transform(scaleMatrix, line3)
  t.true(compareVectors(obs3, [-0.9486832980505139, 0.316227766016838, 0]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), Math.sin(r), 0, 0,
    -Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs4 = transform(rotateZMatrix, line1)
  t.true(compareVectors(obs4, [-1, 0, 0]))
  obs4 = transform(rotateZMatrix, line2)
  // rounding t.true(compareVectors(obs4, [0, -1, 0]))
  obs4 = transform(rotateZMatrix, line3)
  t.true(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -0]))
})

test('line2: transform() called with three paramerters should update a line2 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints([0, 0], [0, 1])
  const line3 = fromPoints([-3, -3], [3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  let ret1 = transform(obs1, identityMatrix, line1)
  t.true(compareVectors(ret1, [0, 1, 0]))
  t.true(compareVectors(obs1, [0, 1, 0]))
  ret1 = transform(obs1, identityMatrix, line2)
  t.true(compareVectors(ret1, [-1, 0, 0]))
  t.true(compareVectors(obs1, [-1, 0, 0]))
  ret1 = transform(obs1, identityMatrix, line3)
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
  let ret2 = transform(obs2, translationMatrix, line1)
  t.true(compareVectors(ret2, [0, 1, 5]))
  t.true(compareVectors(obs2, [0, 1, 5]))
  ret2 = transform(obs2, translationMatrix, line2)
  // t.true(compareVectors(ret2, [-1, 0, -1], 1e-15))
  // t.true(compareVectors(obs2, [-1, 0, -1], 1e-15))
  ret2 = transform(obs2, translationMatrix, line3)
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
  let ret3 = transform(obs3, scaleMatrix, line1)
  // rounding t.true(compareVectors(ret3, [0, 1, 0]))
  // rounding t.true(compareVectors(obs3, [0, 1, 0]))
  ret3 = transform(obs3, scaleMatrix, line2)
  t.true(compareVectors(ret3, [-1, 0, 0]))
  t.true(compareVectors(obs3, [-1, 0, 0]))
  ret3 = transform(obs3, scaleMatrix, line3)
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
  let ret4 = transform(obs4, rotateZMatrix, line1)
  t.true(compareVectors(ret4, [-1, 0, 0]))
  t.true(compareVectors(obs4, [-1, 0, 0]))
  ret4 = transform(obs4, rotateZMatrix, line2)
  // rounding t.true(compareVectors(ret4, [0, -1, 0]))
  // rounding t.true(compareVectors(obs4, [0, -1, 0]))
  ret4 = transform(obs4, rotateZMatrix, line3)
  t.true(compareVectors(ret4, [-0.7071067811865476, -0.7071067811865476, -0]))
  t.true(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -0]))
})
