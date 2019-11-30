const test = require('ava')
const FuzzyFactory = require('./FuzzyFactory')

const { EPS } = require('../../constants')

// Notes:
// - Only factories with elements containing two(2) and three(3) valies are expected.
//   In other words, factories supporting vec2 and vec3 objects.

test('FuzzyFactory: factories for elements with two(2) values should create or lookup properly', (t) => {
  // simple factory based on elements with two values
  const factory2 = new FuzzyFactory(2, EPS)
  t.true((factory2 !== undefined))

  // function to create an instance of the requested element
  const createElement = (values) => {
    return values
  }

  // verify that create works correctly

  let found
  found = factory2.lookupOrCreate([1.0, 2.0], createElement)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)
  found = factory2.lookupOrCreate([1.1, 2.2], createElement)
  t.is(found[0], 1.1)
  t.is(found[1], 2.2)

  found = factory2.lookupOrCreate([-1.0, -2.0], createElement)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
  found = factory2.lookupOrCreate([-1.1, -2.2], createElement)
  t.is(found[0], -1.1)
  t.is(found[1], -2.2)

  const failedLookup = (values) => {
    throw new Error('lookup failed')
  }

  // verify that lookup works correctly

  found = factory2.lookupOrCreate([1.0, 2.0], failedLookup)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)
  found = factory2.lookupOrCreate([1.1, 2.2], failedLookup)
  t.is(found[0], 1.1)
  t.is(found[1], 2.2)

  found = factory2.lookupOrCreate([-1.0, -2.0], failedLookup)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
  found = factory2.lookupOrCreate([-1.1, -2.2], failedLookup)
  t.is(found[0], -1.1)
  t.is(found[1], -2.2)

  // verify that 'close' lookup works correctly

  found = factory2.lookupOrCreate([1.0 + (EPS * 0.10), 2.0 + (EPS * 0.10)], failedLookup)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)

  found = factory2.lookupOrCreate([-1.0 - (EPS * 0.10), -2.0 - (EPS * 0.10)], failedLookup)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
})

test('FuzzyFactory: factories for elements with three(3) values should create or lookup properly', (t) => {
  // simple factory based on elements with three values
  const factory3 = new FuzzyFactory(3, EPS)
  t.true((factory3 !== undefined))

  // function to create an instance of the requested element
  const createElement = (values) => {
    return values
  }

  // verify that create works correctly

  let found
  found = factory3.lookupOrCreate([1.0, 2.0, 3.0], createElement)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)
  t.is(found[2], 3.0)
  found = factory3.lookupOrCreate([1.1, 2.2, 3.3], createElement)
  t.is(found[0], 1.1)
  t.is(found[1], 2.2)
  t.is(found[2], 3.3)

  found = factory3.lookupOrCreate([-1.0, -2.0, -3.0], createElement)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
  t.is(found[2], -3.0)
  found = factory3.lookupOrCreate([-1.1, -2.2, -3.3], createElement)
  t.is(found[0], -1.1)
  t.is(found[1], -2.2)
  t.is(found[2], -3.3)

  const failedLookup = (values) => {
    throw new Error('lookup failed')
  }

  // verify that lookup works correctly

  found = factory3.lookupOrCreate([1.0, 2.0, 3.0], failedLookup)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)
  t.is(found[2], 3.0)
  found = factory3.lookupOrCreate([1.1, 2.2, 3.3], failedLookup)
  t.is(found[0], 1.1)
  t.is(found[1], 2.2)
  t.is(found[2], 3.3)

  found = factory3.lookupOrCreate([-1.0, -2.0, -3.0], failedLookup)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
  t.is(found[2], -3.0)
  found = factory3.lookupOrCreate([-1.1, -2.2, -3.3], failedLookup)
  t.is(found[0], -1.1)

  // verify that 'close' lookup works correctly

  found = factory3.lookupOrCreate([1.0 + (EPS * 0.10), 2.0 + (EPS * 0.10), 3.0 + (EPS * 0.10)], failedLookup)
  t.is(found[0], 1.0)
  t.is(found[1], 2.0)
  t.is(found[2], 3.0)

  found = factory3.lookupOrCreate([-1.0 - (EPS * 0.10), -2.0 - (EPS * 0.10), -3.0 - (EPS * 0.10)], failedLookup)
  t.is(found[0], -1.0)
  t.is(found[1], -2.0)
  t.is(found[2], -3.0)
})
