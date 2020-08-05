const test = require('ava')
const { transform, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: transform() called with two paramerters should return a line3 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints([1, 0, 0], [0, 1, 0])
  const line3 = fromPoints([-3, -3, -3], [3, 3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs1 = transform(identityMatrix, line1)
  t.true(compareVectors(obs1[0], [0, 0, 0]))
  t.true(compareVectors(obs1[1], [0, 0, 1]))
  obs1 = transform(identityMatrix, line2)
  t.true(compareVectors(obs1[0], [1, 0, 0]))
  t.true(compareVectors(obs1[1], [-0.7071067811865475, 0.7071067811865475, 0]))

  obs1 = transform(identityMatrix, line3)
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

  let obs2 = transform(translationMatrix, line1)
  t.true(compareVectors(obs2[0], [1, 5, 7]))
  t.true(compareVectors(obs2[1], [0, 0, 1]))
  obs2 = transform(translationMatrix, line2)
  t.true(compareVectors(obs2[0], [2, 5, 7]))
  t.true(compareVectors(obs2[1], [-0.7071067811865474, 0.7071067811865478, 0]))
  obs2 = transform(translationMatrix, line3)
  t.true(compareVectors(obs2[0], [-2, 2, 4]))
  t.true(compareVectors(obs2[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))

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
  t.true(compareVectors(obs3[0], [0, 0, 0]))
  t.true(compareVectors(obs3[1], [0, 0, 1]))
  obs3 = transform(scaleMatrix, line2)
  t.true(compareVectors(obs3[0], [1, 0, 0]))
  t.true(compareVectors(obs3[1], [-0.3162277660168379, 0.9486832980505137, 0]))
  obs3 = transform(scaleMatrix, line3)
  t.true(compareVectors(obs3[0], [-3, -9, -15]))
  t.true(compareVectors(obs3[1], [0.1690308509457033, 0.5070925528371097, 0.8451542547285166]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), Math.sin(r), 0, 0,
    -Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs4 = transform(rotateZMatrix, line1)
  t.true(compareVectors(obs4[0], [0, 0, 0]))
  t.true(compareVectors(obs4[1], [0, 0, 1]))
  obs4 = transform(rotateZMatrix, line2)
  t.true(compareVectors(obs4[0], [0, 1, 0]))
  t.true(compareVectors(obs4[1], [-0.7071067811865476, -0.7071067811865475, 0]))
  obs4 = transform(rotateZMatrix, line3)
  t.true(compareVectors(obs4[0], [3, -3, -3]))
  t.true(compareVectors(obs4[1], [-0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
})

test('line3: transform() called with three paramerters should update a line3 with correct values', (t) => {
  const line1 = create()
  const line2 = fromPoints([1, 0, 0], [0, 1, 0])
  const line3 = fromPoints([-3, -3, -3], [3, 3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  let ret1 = transform(obs1, identityMatrix, line1)
  t.true(compareVectors(ret1[0], [0, 0, 0]))
  t.true(compareVectors(ret1[1], [0, 0, 1]))
  t.true(compareVectors(obs1[0], [0, 0, 0]))
  t.true(compareVectors(obs1[1], [0, 0, 1]))
  t.not(line1, obs1)
  t.is(ret1, obs1)
  ret1 = transform(obs1, identityMatrix, line2)
  t.true(compareVectors(ret1[0], [1, 0, 0]))
  t.true(compareVectors(ret1[1], [-0.7071067811865475, 0.7071067811865475, 0]))
  t.true(compareVectors(obs1[0], [1, 0, 0]))
  t.true(compareVectors(obs1[1], [-0.7071067811865475, 0.7071067811865475, 0]))
  ret1 = transform(obs1, identityMatrix, line3)
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
  let ret2 = transform(line1, translationMatrix, line1)
  t.true(compareVectors(ret2[0], [1, 5, 7]))
  t.true(compareVectors(ret2[1], [0, 0, 1]))
  t.true(compareVectors(line1[0], [1, 5, 7]))
  t.true(compareVectors(line1[1], [0, 0, 1]))
  t.is(ret2, line1)
  ret2 = transform(line2, translationMatrix, line2)
  t.true(compareVectors(ret2[0], [2, 5, 7]))
  t.true(compareVectors(ret2[1], [-0.7071067811865474, 0.7071067811865478, 0]))
  t.true(compareVectors(line2[0], [2, 5, 7]))
  t.true(compareVectors(line2[1], [-0.7071067811865474, 0.7071067811865478, 0]))
  t.is(ret2, line2)
  ret2 = transform(line3, translationMatrix, line3)
  t.true(compareVectors(ret2[0], [-2, 2, 4]))
  t.true(compareVectors(ret2[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))
  t.true(compareVectors(line3[0], [-2, 2, 4]))
  t.true(compareVectors(line3[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))
  t.is(ret2, line3)
})
