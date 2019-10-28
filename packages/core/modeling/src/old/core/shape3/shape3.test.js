const test = require('ava')
const create = require('./create')
const fromPolygons = require('./fromPolygons')

test.skip('shape3: create() should return an empty shape3', t => {
  const obs = create()
  const exp = { 
    type: 'shape3',
    polygons: [],
    properties: {},
    isCanonicalized: true,
    isRetesselated: true }
  t.deepEqual(obs, exp)
})

test.skip('shape3: fromPolygons() should create a shape3 built using those polygons', t => {
  const polygons = [
    [// a simple triangle
      [0, 0, 0],
      [0, 10, 0],
      [0, 10, 10]
    ]
  ]
  const obs = fromPolygons(polygons)
  const exp = { type: 'shape3',
    polygons,
    properties: {},
    isCanonicalized: false,
    isRetesselated: false }
  t.deepEqual(obs, exp)
})
