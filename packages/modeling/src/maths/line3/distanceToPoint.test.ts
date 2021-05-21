import test from 'ava'
import { distanceToPoint, create, fromPoints } from './index'

import { nearlyEqual } from '../../../test/helpers/index'
import { EPS } from '../constants'

test('line3: distanceToPoint() should return proper values', (t) => {
  const line1 = create()
  const dis1 = distanceToPoint(line1, [0, 0, 0])
  nearlyEqual(t, dis1, 0, EPS)
  const dis2 = distanceToPoint(line1, [1, 0, 0])
  nearlyEqual(t, dis2, 1, EPS)
  const dis3 = distanceToPoint(line1, [0, 1, 0])
  nearlyEqual(t, dis3, 1, EPS)

  const line2 = fromPoints(create(), [-5, -5, -4], [5, 5, 6])
  const dis4 = distanceToPoint(line2, [0, 0, 0])
  nearlyEqual(t, dis4, 0.8164965809277724, EPS)
  const dis5 = distanceToPoint(line2, [1, 0, 0])
  nearlyEqual(t, dis5, 1.4142135381698608, EPS)
  const dis6 = distanceToPoint(line2, [2, 0, 0])
  nearlyEqual(t, dis6, 2.1602468994693043, EPS)
  const dis7 = distanceToPoint(line2, [3, 0, 0])
  nearlyEqual(t, dis7, 2.9439202887759617, EPS)
  const dis8 = distanceToPoint(line2, [4, 0, 0])
  nearlyEqual(t, dis8, 3.7416573867739413, EPS)
  const dis9 = distanceToPoint(line2, [5, 0, 0])
  nearlyEqual(t, dis9, 4.546060565661961, EPS)

  t.true(true)
})