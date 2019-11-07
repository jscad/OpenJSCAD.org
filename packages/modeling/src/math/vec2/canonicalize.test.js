const canonicalize = require('./canonicalize')
const equals = require('./equals')
const fromValues = require('./fromValues')
const test = require('ava')

const piVec = fromValues(3.141592653589793, 3.141592653589793)

// This test is intended to be illustrative, and establish ground truth
// It will need to be updated if ../../constants.spatialResolution changes.
test('vec2: Canonicalization quantizes to spatial resolution', t => {
  t.true(equals(canonicalize(piVec), fromValues(3.141590118408203, 3.141590118408203)))
})

test('vec2: Canonicalization is transformative', t => {
  t.false(equals(piVec, canonicalize(piVec)));
})

test('vec2: Canonicalization is idempotent', t => {
  t.true(equals(canonicalize(piVec), canonicalize(canonicalize(piVec))));
})
