const test = require('ava')
const { xAtY, create, fromPoints } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('line2: xAtY() should return proper values', (t) => {
  const line1 = create()

  const x1 = xAtY(line1, 0)
  nearlyEqual(t, x1, 0, EPS)

  const x2 = xAtY(line1, 6)
  t.false(Number.isFinite(x2)) // X is infinite, as the line is parallel to X-axis

  const x3 = xAtY(line1, -6)
  t.false(Number.isFinite(x3)) // X is infinite, as the line is parallel to X-axis

  const line2 = fromPoints(create(), [-5, 4], [5, -6])
  const y1 = xAtY(line2, 0)
  nearlyEqual(t, y1, -1, EPS)

  const y2 = xAtY(line2, 1)
  nearlyEqual(t, y2, -2, EPS)

  const y3 = xAtY(line2, 2)
  nearlyEqual(t, y3, -3, EPS)

  const y4 = xAtY(line2, -1)
  nearlyEqual(t, y4, 0, EPS)

  const y5 = xAtY(line2, -2)
  nearlyEqual(t, y5, 1, EPS)

  const y6 = xAtY(line2, -3)
  nearlyEqual(t, y6, 2, EPS)

  t.true(true)
})
