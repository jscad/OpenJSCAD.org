const test = require('ava')

const { geom2, geom3 } = require('../../geometries')

const hullChain = require('./hullChain')

test('hullChain (two, geom2)', (t) => {
  const geometry1 = geom2.fromPoints([[6, 6], [3, 6], [3, 3], [6, 3]])
  const geometry2 = geom2.fromPoints([[-6, -6], [-9, -6], [-9, -9], [-6, -9]])

  // same
  let obs = hullChain(geometry1, geometry1)
  let pts = geom2.toPoints(obs)

  t.is(pts.length, 4)

  // different
  obs = hullChain(geometry1, geometry2)
  pts = geom2.toPoints(obs)

  t.is(pts.length, 6)
})

test('hullChain (three, geom2)', (t) => {
  const geometry1 = geom2.fromPoints([[6, 6], [3, 6], [3, 3], [6, 3]])
  const geometry2 = geom2.fromPoints([[-6, -6], [-9, -6], [-9, -9], [-6, -9]])
  const geometry3 = geom2.fromPoints([[-6, 6], [-3, 6], [-3, 9], [-6, 9]])

  // open
  let obs = hullChain(geometry1, geometry2, geometry3)
  let pts = geom2.toPoints(obs)

  // the sides change based on the bestplane chosen in trees/Node.js
  t.is(pts.length, 10)
  // t.is(pts.length, 11)

  // closed
  obs = hullChain(geometry1, geometry2, geometry3, geometry1)
  pts = geom2.toPoints(obs)

  // the sides change based on the bestplane chosen in trees/Node.js
  t.is(pts.length, 10)
  // t.is(pts.length, 13)
})

test('hullChain (three, geom3)', (t) => {
  const geometry1 = geom3.fromPoints(
    [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]]
  )
  const geometry2 = geom3.fromPoints(
    [[[3.5, 3.5, 3.5], [3.5, 3.5, 6.5], [3.5, 6.5, 6.5], [3.5, 6.5, 3.5]],
      [[6.5, 3.5, 3.5], [6.5, 6.5, 3.5], [6.5, 6.5, 6.5], [6.5, 3.5, 6.5]],
      [[3.5, 3.5, 3.5], [6.5, 3.5, 3.5], [6.5, 3.5, 6.5], [3.5, 3.5, 6.5]],
      [[3.5, 6.5, 3.5], [3.5, 6.5, 6.5], [6.5, 6.5, 6.5], [6.5, 6.5, 3.5]],
      [[3.5, 3.5, 3.5], [3.5, 6.5, 3.5], [6.5, 6.5, 3.5], [6.5, 3.5, 3.5]],
      [[3.5, 3.5, 6.5], [6.5, 3.5, 6.5], [6.5, 6.5, 6.5], [3.5, 6.5, 6.5]]]
  )
  const geometry3 = geom3.fromPoints(
    [[[-4.5, 1.5, -4.5], [-4.5, 1.5, -1.5], [-4.5, 4.5, -1.5], [-4.5, 4.5, -4.5]],
      [[-1.5, 1.5, -4.5], [-1.5, 4.5, -4.5], [-1.5, 4.5, -1.5], [-1.5, 1.5, -1.5]],
      [[-4.5, 1.5, -4.5], [-1.5, 1.5, -4.5], [-1.5, 1.5, -1.5], [-4.5, 1.5, -1.5]],
      [[-4.5, 4.5, -4.5], [-4.5, 4.5, -1.5], [-1.5, 4.5, -1.5], [-1.5, 4.5, -4.5]],
      [[-4.5, 1.5, -4.5], [-4.5, 4.5, -4.5], [-1.5, 4.5, -4.5], [-1.5, 1.5, -4.5]],
      [[-4.5, 1.5, -1.5], [-1.5, 1.5, -1.5], [-1.5, 4.5, -1.5], [-4.5, 4.5, -1.5]]]
  )

  // open
  let obs = hullChain(geometry1, geometry2, geometry3)
  let pts = geom3.toPoints(obs)

  // t.is(pts.length, 27)
  t.is(pts.length, 23)

  // closed
  obs = hullChain(geometry1, geometry2, geometry3, geometry1)
  pts = geom3.toPoints(obs)

  // t.is(pts.length, 45)
  t.is(pts.length, 28)
})
