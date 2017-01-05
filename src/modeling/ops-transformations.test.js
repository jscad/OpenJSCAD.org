import test from 'ava'
import { cube, sphere } from './primitives3d'
import { translate, rotate, scale, center, mirror, expand, contract, multmatrix, minkowski, hull, chain_hull } from './ops-transformations'

test('translate (single item)', t => {
  const op1 = cube()
  const obs = translate([0, 10, 0], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
})

test('translate (multiple items)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = translate([0, 10, 0], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

test('rotate (single item)', t => {
  const op1 = cube()
  const obs = rotate([0, Math.PI, 0], op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
})

test('rotate (multiple item)', t => {
  const op1 = cube()
  const op2 = sphere({center: false})

  const obs = rotate([0, Math.PI, 0], op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5266504075063266, _y: 0.5, _z: 0.47184674235753715})
  t.deepEqual(obs.properties.sphere.center, {_x: 1.0533008150126533, _y: 1, _z: 0.9436934847150743})
})

test('scale (single item)', t => {
  const op1 = cube()
  const obs = scale([2, 1, 1], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 0.5})
})

test('scale (multiple item)', t => {
  const op1 = cube()
  const op2 = sphere({center: false})
  const obs = scale([2, 1, 1], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 1, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 2, _y: 1, _z: 1})
})

test('center (single item)', t => {
  const op1 = cube()
  const obs = center(true, op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0.5, _z: 0.5})
})

test('center (multiple item)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = center(true, op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 0.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

test('mirror (single item)', t => {
  const op1 = cube()
  const obs = mirror([10, 20, 90], op1)
  t.deepEqual(obs.properties.cube.center, {_x: 0.36046511627906974, _y: 0.2209302325581396, _z: -0.7558139534883721})
})

test('mirror (multiple item)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = mirror([10, 20, 90], op1, op2)
  t.deepEqual(obs.properties.cube.center, {_x: 0.36046511627906974, _y: 0.2209302325581396, _z: -0.7558139534883721})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

test('expand (single item)', t => {
  const op1 = cube()
  const obs = expand(10, 5, op1)

  t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
})

test('expand (multiple items)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = expand(10, 5, op1, op2)

  t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

test('contract (single item)', t => {
  const op1 = cube()
  const obs = contract(5, 1, op1)

  t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
})

test('contract (multiple items)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = contract(5, 1, op1, op2)

  t.deepEqual(obs.polygons[0].vertices[0], {pos: {_x: -10, _y: 0, _z: 0}})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 0, _z: 0})
})

test('multmatrix (single item)', t => {
  const op1 = cube()
  const obs = multmatrix([1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], op1)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
})

test('multmatrix (multiple items)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = multmatrix([1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

test('minkowski (multiple items)', t => {
  const op1 = cube()
  const op2 = sphere({center: true})
  const obs = minkowski(op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

test('hull (defaults)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = hull(op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

test('chain_hull (defaults)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = chain_hull(op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})
