import test from 'ava'
import { cube, sphere } from './primitives3d'
import { square, circle } from './primitives2d'
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

test('translate (single item , 2d)', t => {
  const op1 = square()
  const obs = translate([0, 10, 0], op1)

  t.deepEqual(obs.sides[0], { vertex0: { pos: { _x: 0, _y: 11 } }, vertex1: { pos: { _x: 0, _y: 10 } } })
  t.deepEqual(obs.sides[obs.sides.length - 1], { vertex0: { pos: { _x: 1, _y: 11 } }, vertex1: { pos: { _x: 0, _y: 11 } } })
})

test('translate (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = translate([0, 10, 0], op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 2, _y: 11}}, vertex1: {pos: {_x: 1.9807852804032304, _y: 11.195090322016128}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0, _y: 10}}, vertex1: {pos: {_x: 0.9999999999999998, _y: 10}}})
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

test('rotate (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = rotate([0, 10, 0], op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 1.969615506024416, _y: 1}}, vertex1: {pos: {_x: 1.9506927011935618, _y: 1.1950903220161282}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0, _y: 0}}, vertex1: {pos: {_x: 0.9848077530122078, _y: 0}}})
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

test('scale (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = scale([0, 10, 0], op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 0, _y: 10}}, vertex1: {pos: {_x: 0, _y: 11.950903220161281}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0, _y: 0}}, vertex1: {pos: {_x: 0, _y: 0}}})
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

test('center (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = center(true, op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 2, _y: 1}}, vertex1: {pos: {_x: 1.9807852804032304, _y: 1.1950903220161282}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0, _y: 0}}, vertex1: {pos: {_x: 0.9999999999999998, _y: 0}}})
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

test('mirror (multiple items, 2d)', t => {
  const op1 = square().translate([0, 5])
  const op2 = circle().translate([5, 2])
  const obs = mirror(true, op1, op2)

  t.deepEqual(obs.sides[0].vertex0, 0)
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

test('expand (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = expand(10, 5, op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 11, _y: 0}}, vertex1: {pos: {_x: 11, _y: 1}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: -1.8369701987210296e-15, _y: -10}},vertex1: {pos: {_x: 0.9999999999999981, _y: -10}}})
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

test('contract (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = contract(10, 5, op1, op2)

  // FIXME: these are fake values, but it does not work either way
  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 11, _y: 0}}, vertex1: {pos: {_x: 11, _y: 1}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: -1.8369701987210296e-15, _y: -10}},vertex1: {pos: {_x: 0.9999999999999981, _y: -10}}})
})

// TODO: after this point these are all temp tests, implementation & tests need to be created
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

test('hull (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = hull(op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 0, _y: 1.0000000000000002}}, vertex1: {pos: {_x: 0,_y: 0}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0.01921471959676957, _y: 1.1950903220161286}}, vertex1: {pos: {_x: 0, _y: 1.0000000000000002}}})
})

test('chain_hull (defaults)', t => {
  const op1 = cube()
  const op2 = sphere()
  const obs = chain_hull(op1, op2)

  t.deepEqual(obs.properties.cube.center, {_x: 0.5, _y: 10.5, _z: 0.5})
  t.deepEqual(obs.properties.sphere.center, {_x: 0, _y: 10, _z: 0})
})

test('chain_hull (multiple items, 2d)', t => {
  const op1 = square()
  const op2 = circle()
  const obs = chain_hull(op1, op2)

  t.deepEqual(obs.sides[0], {vertex0: {pos: {_x: 0, _y: 1.0000000000000002}}, vertex1: {pos: {_x: 0,_y: 0}}})
  t.deepEqual(obs.sides[obs.sides.length - 1], {vertex0: {pos: {_x: 0.01921471959676957, _y: 1.1950903220161286}}, vertex1: {pos: {_x: 0, _y: 1.0000000000000002}}})
})
