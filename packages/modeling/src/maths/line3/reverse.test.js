const test = require('ava')
const { reverse, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: reverse() should return proper lines', (t) => {
  const line1 = create()
  let rev = reverse(line1)
  let pnt = rev[0]
  let dir = rev[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [0, 0, -1]))

  const line2 = fromPoints([1, 0, 0], [0, 1, 0])
  rev = reverse(line2)
  pnt = rev[0]
  dir = rev[1]
  t.true(compareVectors(pnt, [1, 0, 0]))
  t.true(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0]))

  const line3 = fromPoints([0, 1, 0], [1, 0, 0])
  rev = reverse(line3)
  pnt = rev[0]
  dir = rev[1]
  t.true(compareVectors(pnt, [0, 1, 0]))
  t.true(compareVectors(dir, [-0.7071067811865475, 0.7071067811865475, 0]))

  const line4 = fromPoints([0, 6, 0], [0, 0, 6])
  rev = reverse(line4)
  pnt = rev[0]
  dir = rev[1]
  t.true(compareVectors(pnt, [0, 6, 0]))
  t.true(compareVectors(dir, [0, 0.7071067811865475, -0.7071067811865475]))

  const line5 = fromPoints([-5, 5, 5], [5, -5, -5])
  rev = reverse(line5)
  pnt = rev[0]
  dir = rev[1]
  t.true(compareVectors(pnt, [-5, 5, 5]))
  t.true(compareVectors(dir, [-0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
})

test('line3: reverse() called with two paramerters should update a line3 with proper values', (t) => {
  const line1 = create()
  const out = create()
  let rev = reverse(out, line1)
  let pnt = rev[0]
  let dir = rev[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [0, 0, -1]))
  pnt = out[0]
  dir = out[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [0, 0, -1]))
  t.not(line1, out)
  t.is(rev, out)

  // reverse in place
  const line2 = fromPoints([1, 0, 0], [0, 1, 0])
  rev = reverse(line2, line2)
  pnt = rev[0]
  dir = rev[1]
  t.true(compareVectors(pnt, [1, 0, 0]))
  t.true(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0]))
  pnt = line2[0]
  dir = line2[1]
  t.true(compareVectors(pnt, [1, 0, 0]))
  t.true(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0]))
  t.is(rev, line2)
})
