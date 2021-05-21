const test = require('ava')

const { close, create, fromPoints } = require('./index')

test('close: closes an empty path', (t) => {
  const p1 = create()
  t.false(p1.isClosed)

  const p2 = close(p1)
  t.true(p2.isClosed)
  t.not(p1, p2)

  const p3 = close(p2)
  t.true(p3.isClosed)
  t.is(p2, p3)
})

test('close: closes various paths', (t) => {
  let p1 = create()
  p1 = close(p1)
  t.true(p1.isClosed)
  t.is(0, p1.points.length)

  let p2 = fromPoints({ closed: false }, [])
  p2 = close(p2)
  t.true(p2.isClosed)
  t.is(0, p2.points.length)

  let p3 = fromPoints({ closed: true }, [[0, 0]])
  p3 = close(p3)
  t.true(p3.isClosed)
  t.is(1, p3.points.length)

  let p4 = fromPoints({ closed: true }, [[0, 0], [0, 0]])
  p4 = close(p4)
  t.true(p4.isClosed)
  t.is(1, p4.points.length) // the last point is removed

  let p5 = fromPoints({ closed: true }, [[0, 0], [1, 1], [0, 0]])
  p5 = close(p5)
  t.true(p5.isClosed)
  t.is(2, p5.points.length) // the last point is removed
})
