const test = require('ava')
const { translate, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: translate() called with two paramerters should return a mat4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = translate([0, 0, 0], identityMatrix)
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs2 = translate([2, 3, 6], identityMatrix)
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = translate([-2, -3, -6], translationMatrix)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = translate([2, 3, 6], scaleMatrix)
  t.true(compareVectors(obs4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1]))

  // const r = (90 * 0.017453292519943295)
  // const rotateZMatrix = [
  //   Math.cos(r), -Math.sin(r), 0, 0,
  //   Math.sin(r), Math.cos(r), 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ]

  // const obs5 = translate([6, 4, 2], rotateZMatrix)
  // t.true(compareVectors(obs5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
})

test('mat4: translate() called with three paramerters should update a mat4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  const ret1 = translate(obs1, [0, 0, 0], identityMatrix)
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs2 = create(0, 0, 0, 0)
  const ret2 = translate(obs2, [2, 3, 6], identityMatrix)
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1]))
  t.true(compareVectors(ret2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = create()
  const ret3 = translate(obs3, [-2, -3, -6], translationMatrix)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1]))
  t.true(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = create()
  const ret4 = translate(obs4, [2, 3, 6], scaleMatrix)
  t.true(compareVectors(obs4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1]))
  t.true(compareVectors(ret4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1]))

  // const r = (90 * 0.017453292519943295)
  // const rotateZMatrix = [
  //   Math.cos(r), -Math.sin(r), 0, 0,
  //   Math.sin(r), Math.cos(r), 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ]

  // const obs5 = create()
  // const ret5 = translate(obs5, [6, 4, 2], rotateZMatrix)
  // t.true(compareVectors(obs5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
  // t.true(compareVectors(ret5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero

  // special case where in and out are the same
  // const obs6 = clone(rotateZMatrix)
  // const ret6 = translate(obs6, [6, 4, 2], obs6)
  // t.true(compareVectors(obs6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
  // t.true(compareVectors(ret6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
})
