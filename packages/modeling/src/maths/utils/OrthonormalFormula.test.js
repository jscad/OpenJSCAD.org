import test from 'ava'

import { plane } from '../index.js'

import { OrthonormalFormula } from './index.js'

test('utils: OrthonormalFormula constructor', (t) => {
  const p1 = plane.fromNormalAndPoint(plane.create(), [5, 0, 0], [0, 0, 0])
  const p2 = plane.fromNormalAndPoint(plane.create(), [0, 0, 5], [5, 5, 5])

  const o1 = new OrthonormalFormula(p1)
  t.deepEqual(o1.u, [0, -1, 0])
  t.deepEqual(o1.v, [0, 0, -1])

  const o2 = new OrthonormalFormula(p2)
  t.deepEqual(o2.u, [-1, 0, 0])
  t.deepEqual(o2.v, [0, -1, 0])
})

test('utils: OrthonormalFormula methods', (t) => {
  const p1 = plane.fromNormalAndPoint(plane.create(), [5, 0, 0], [5, 0, 0])
  const o1 = new OrthonormalFormula(p1)

  const v1 = [5, 0, 0]
  const v2 = [0, 5, 0]
  const v3 = [0, 0, 5]
  const v4 = [-5, 0, 0]
  const v5 = [0, -5, 0]
  const v6 = [0, 0, -5]

  const t1 = o1.to2D(v1)
  t.deepEqual(t1, [0, 0])
  const t2 = o1.to2D(v2)
  t.deepEqual(t2, [-5, 0])
  const t3 = o1.to2D(v3)
  t.deepEqual(t3, [0, -5])
  const t4 = o1.to2D(v4)
  t.deepEqual(t4, [0, 0])
  const t5 = o1.to2D(v5)
  t.deepEqual(t5, [5, 0])
  const t6 = o1.to2D(v6)
  t.deepEqual(t3, [0, -5])

  const r1 = o1.to3D(t1)
  t.deepEqual(r1, v1)
  const r2 = o1.to3D(t2)
  t.deepEqual(r2, v2)
  const r3 = o1.to3D(t3)
  t.deepEqual(r3, v3)
  const r4 = o1.to3D(t4)
  t.deepEqual(r4, v4)
  const r5 = o1.to3D(t5)
  t.deepEqual(r5, v5)
  const r6 = o1.to3D(t6)
  t.deepEqual(r6, v6)

  const m1 = o1.getProjectionMatrix()
  t.deepEqual(m1, [
    0, 0, 1, 0,
    -1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, -5, 1
  ])
  const m2 = o1.getInverseProjectionMatrix()
  t.deepEqual(m2, [
    0, -1, 0, 0,
    0, 0, -1, 0,
    1, 0, 0, 0,
    5, 0, 0, 1
  ])
})
