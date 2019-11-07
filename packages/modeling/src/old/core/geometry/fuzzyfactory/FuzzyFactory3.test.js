const test = require('ava')

const { EPS } = require('../../constants')
const poly3 = require('../poly3')

const FuzzyFactory3 = require('./FuzzyFactory3')

const { comparePolygons } = require('../../../../test/helpers/index')

test('FuzzyFactory3: factories should create or lookup polygons correctly', (t) => {
  const delta = (EPS * 0.01)

  const p1 = poly3.fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const p2 = poly3.fromPoints([[0, 0, 0], [-1, 0, 0], [-1, -1, 0]])

  const c1 = poly3.fromPoints([[0, 0 + delta, 0], [1 + delta, 0, 0], [1, 1, 0 + delta]])
  const c2 = poly3.fromPoints([[0, 0 - delta, 0], [-1 - delta, 0, 0], [-1, -1, 0 - delta]])

  const factory = new FuzzyFactory3()
  t.true((factory !== undefined))

  // verify fuzzy creation of polgons

  let found
  found = factory.getPolygon(p1)
  t.true(comparePolygons(found, p1))
  found = factory.getPolygon(p2)
  t.true(comparePolygons(found, p2))

  // verify fuzzy lookup of 'close' polygons

  found = factory.getPolygon(c1)
  t.true(comparePolygons(found, p1))
  found = factory.getPolygon(c2)
  t.true(comparePolygons(found, p2))
})
