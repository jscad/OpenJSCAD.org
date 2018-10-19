const test = require('ava')
const CSG = require('../csg')

// NOTE: these are kept for now as a way to make sure the root 
// exported object from csg.js has all these helpers

test('root csg objects provides parseOption', t => {
  t.true(CSG.hasOwnProperty('parseOptionAsFloat'))
})

test('root csg objects provides parseOptionAsFloat', t => {
  t.true(CSG.hasOwnProperty('parseOptionAsFloat'))
})

test('root csg objects provides parseOptionAsInt', t => {
  t.true(CSG.hasOwnProperty('parseOptionAsInt'))
})

test('root csg objects provides parseOptionAsBool', t => {
  t.true(CSG.hasOwnProperty('parseOptionAsBool'))
})

test('root csg objects provides parseOptionAs2DVector', t => {
  t.true(CSG.hasOwnProperty('parseOptionAs2DVector'))
})

test('root csg objects provides parseOptionAs3DVector', t => {
  t.true(CSG.hasOwnProperty('parseOptionAs3DVector'))
})

test('root csg objects provides parseOptionAs3DVectorList', t => {
  t.true(CSG.hasOwnProperty('parseOptionAs3DVectorList'))
})
