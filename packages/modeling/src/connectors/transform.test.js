const test = require('ava')

const { transform, create, fromPointAxisNormal } = require('./index')

const { compareVectors } = require('../../test/helpers/')

test('connector: transform() should return a connector with correct values', (t) => {
  const connector1 = create()
  const connector2 = fromPointAxisNormal([1, 0, 0], [0, 1, 0], [0, 0, 1])
  const connector3 = fromPointAxisNormal([-3, -3, -3], [3, 3, 3], [3, -3, 3])

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs1 = transform(identityMatrix, connector1)
  t.true(compareVectors(obs1.point, [0, 0, 0]))
  t.true(compareVectors(obs1.axis, [0, 0, 1]))
  t.true(compareVectors(obs1.normal, [1, 0, 0]))

  obs1 = transform(identityMatrix, connector2)
  t.true(compareVectors(obs1.point, [1, 0, 0]))
  t.true(compareVectors(obs1.axis, [0, 1, 0]))
  t.true(compareVectors(obs1.normal, [0, 0, 1]))

  obs1 = transform(identityMatrix, connector3)
  t.true(compareVectors(obs1.point, [-3, -3, -3]))
  t.true(compareVectors(obs1.axis, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
  t.true(compareVectors(obs1.normal, [0.5773502691896258, -0.5773502691896258, 0.5773502691896258]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  let obs2 = transform(translationMatrix, connector1)
  t.true(compareVectors(obs2.point, [1, 5, 7]))
  t.true(compareVectors(obs2.axis, [0, 0, 1]))
  t.true(compareVectors(obs2.normal, [1, 0, 0]))

  obs2 = transform(translationMatrix, connector2)
  t.true(compareVectors(obs2.point, [2, 5, 7]))
  t.true(compareVectors(obs2.axis, [0, 1, 0]))
  t.true(compareVectors(obs2.normal, [0, 0, 1]))

  obs2 = transform(translationMatrix, connector3)
  t.true(compareVectors(obs2.point, [-2, 2, 4]))
  t.true(compareVectors(obs2.axis, [0.5773502691896256, 0.5773502691896256, 0.5773502691896261]))
  t.true(compareVectors(obs2.normal, [0.5773502691896256, -0.5773502691896256, 0.5773502691896261]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  let obs3 = transform(scaleMatrix, connector1)
  t.true(compareVectors(obs3.point, [0, 0, 0]))
  t.true(compareVectors(obs3.axis, [0, 0, 1]))
  t.true(compareVectors(obs3.normal, [1, 0, 0]))

  obs3 = transform(scaleMatrix, connector2)
  t.true(compareVectors(obs3.point, [1, 0, 0]))
  t.true(compareVectors(obs3.axis, [0, 1, 0]))
  t.true(compareVectors(obs3.normal, [0, 0, 1]))

  obs3 = transform(scaleMatrix, connector3)
  t.true(compareVectors(obs3.point, [-3, -9, -15]))
  t.true(compareVectors(obs3.axis, [0.1690308509457033, 0.5070925528371097, 0.8451542547285166]))
  t.true(compareVectors(obs3.normal, [0.1690308509457033, -0.5070925528371097, 0.8451542547285166]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), Math.sin(r), 0, 0,
    -Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  let obs4 = transform(rotateZMatrix, connector1)
  t.true(compareVectors(obs4.point, [0, 0, 0]))
  t.true(compareVectors(obs4.axis, [0, 0, 1]))
  t.true(compareVectors(obs4.normal, [6.123234262925839e-17, 1, 0]))

  obs4 = transform(rotateZMatrix, connector2)
  t.true(compareVectors(obs4.point, [0, 1, 0]))
  t.true(compareVectors(obs4.axis, [-1, 0, 0]))
  t.true(compareVectors(obs4.normal, [0, 0, 1]))

  obs4 = transform(rotateZMatrix, connector3)
  t.true(compareVectors(obs4.point, [3, -3, -3]))
  t.true(compareVectors(obs4.axis, [-0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
  t.true(compareVectors(obs4.normal, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
})
