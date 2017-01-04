import test from 'ava'
import { cube } from './primitives3d'
import { square } from './primitives2d'
import { translate, rotate, scale, center, mirror, expand, contract, multmatrix, minkowski, hull, chain_hull } from './ops-booleans'

test('translate (defaults)', t => {
  const op1 = cube()
  const obs = translate(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('rotate (defaults)', t => {
  const op1 = cube()
  const obs = rotate(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('scale (defaults)', t => {
  const op1 = cube()
  const obs = scale(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('center (defaults)', t => {
  const op1 = cube()
  const obs = center(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('mirror (defaults)', t => {
  const op1 = cube()
  const obs = mirror(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('expand (defaults)', t => {
  const op1 = cube()
  const obs = expand(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('contract (defaults)', t => {
  const op1 = cube()
  const obs = contract(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('multmatrix (defaults)', t => {
  const op1 = cube()
  const obs = multmatrix(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('minkowski (defaults)', t => {
  const op1 = cube()
  const obs = minkowski(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('hull (defaults)', t => {
  const op1 = cube()
  const op2 = cube()
  const obs = hull(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})

test('chain_hull (defaults)', t => {
  const op1 = cube()
  const op2 = cube()
  const obs = chain_hull(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})
