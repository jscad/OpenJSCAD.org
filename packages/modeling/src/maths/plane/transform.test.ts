import test from 'ava'
import { transform, create, fromValues } from './index'

import { compareVectors } from '../../../test/helpers/index'

import Mat4 from '../mat4/type'

test('plane: transform() called with three paramerters should return a plane with correct values', (t) => {
  const identityMatrix: Mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const out = create()
  const obs1 = transform(out, fromValues(0, 0, 1, 0), identityMatrix)
  t.true(compareVectors(obs1, [0 / 0, 0 / 0, 0 / 0, 0 / 0]))
  t.is(out, obs1)

  const plane2 = fromValues(0, 0, -1, 0)
  const obs2 = transform(out, plane2, identityMatrix)
  t.true(compareVectors(obs2, [0, 0, -1, 0]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix: Mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const plane3 = fromValues(0, 0, 1, 0)
  const obs3 = transform(out, plane3, translationMatrix)
  t.true(compareVectors(obs3, [0, 0, 1, 7]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix: Mat4 = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const plane4 = fromValues(0, -1, 0, 0)
  const obs4 = transform(out, plane4, scaleMatrix)
  t.true(compareVectors(obs4, [0, -1, 0, 0]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix: Mat4 = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const plane5 = fromValues(-1, 0, 0, 0)
  const obs5 = transform(plane5, plane5, rotateZMatrix)
  t.true(compareVectors(obs5, [-0, 1, 0, 0]))

  const mirrorMatrix: Mat4 = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  const plane6 = fromValues(1, 0, 0, 0)
  const obs6 = transform(plane6, plane6, mirrorMatrix)
  t.true(compareVectors(obs6, [-1, 0, 0, 0]))
})
