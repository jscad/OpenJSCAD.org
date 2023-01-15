import test from 'ava'

import { TAU } from '../../maths/constants.js'
import { mat4 } from '../../maths/index.js'

import { calculatePlane, create, fromPoints, transform } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('slice: calculatePlane() returns correct plans for various slices', (t) => {
  // do not do this... it's an error
  // const slice1 = create()
  // const plane1 = calculatePlane(slice1)

  const slice2 = fromPoints([[0, 0], [1, 0], [1, 1]])
  const plane2 = calculatePlane(slice2)
  t.true(compareVectors(plane2, [0, 0, 1, 0]))

  const slice3 = transform(mat4.fromXRotation(mat4.create(), TAU / 4), slice2)
  const plane3 = calculatePlane(slice3)
  t.true(compareVectors(plane3, [0, -1, 0, 0]))

  const slice4 = transform(mat4.fromZRotation(mat4.create(), TAU / 4), slice3)
  const plane4 = calculatePlane(slice4)
  t.true(compareVectors(plane4, [1, 0, 0, 0]))

  // Issue #749
  const slice5 = fromPoints([[-4, 0, 2], [4, 0, 2], [4, 5, 2], [6, 5, 2], [4, 7, 2], [-4, 7, 2], [-6, 5, 2], [-4, 5, 2]])
  const plane5 = calculatePlane(slice5)
  t.true(compareVectors(plane5, [0, 0, 1, 2]))

  const slice6 = fromPoints([[4, 0, 0], [-4, 0, 0], [-4, 5, 0], [-6, 5, 0], [-4, 7, 0], [4, 7, 0], [6, 5, 0], [4, 5, 0]])
  const plane6 = calculatePlane(slice6)
  t.true(compareVectors(plane6, [0, 0, -1, 0]))

  // from extrude tests
  const slice7 = create([
    [[-10, 10, 0], [-10, -10, 0], [10, -10, 0], [10, 10, 0]],
    [[-5, -5, 0], [-5, 5, 0], [5, 5, 0], [5, -5, 0]]
  ])
  const plane7 = calculatePlane(slice7)
  t.true(compareVectors(plane7, [0, 0, 1, 0]))
})
