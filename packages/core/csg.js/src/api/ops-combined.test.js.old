const test = require('ava')
const cube = require('./primitives/cuboid')
const torus = require('./primitives/torus')
const circle = require('./primitives/circle')
const linearExtrude = require('./ops-extrusions/linearExtrude')
const union = require('./ops-booleans/union')
const intersection = require('./ops-booleans/intersection')
// any tests that involve multiple operands (extrude with union translate with difference etc)
// and are not testing a specific feature (union, difference, translate etc)
// belong here

test('linearExtrude of union of 2d shapes', t => {
  const obs = linearExtrude({height: 0.1}, union([
    circle({r: 8, center: true}).translate([0, 20, 0]),
    circle({r: 8, center: true})
  ]))

  t.deepEqual(obs.polygons.length, 142)
})

test('intersection of torus where ro===r1 and cube', t => {
  const obs = intersection(
    torus({ro: 0.5, ri: 0.5}),
    cube()
  )

  t.deepEqual(obs.polygons.length, 67)
})
