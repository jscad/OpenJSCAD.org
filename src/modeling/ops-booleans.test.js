import test from 'ava'
import { cube } from './primitives3d'
import { square } from './primitives2d'
import { union, difference, intersection } from './ops-booleans'

test('union (defaults)', t => {
  const op1 = cube()
  const op2 = cube({size: 10})

  const obs = union(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})

test('union (more than 2 operands)', t => {
  const op1 = cube()
  const op2 = cube()
  const op3 = cube({size: 10})

  const obs = union(op1, op2, op3)

  t.deepEqual(obs.polygons.length, 6)
})

test('union (2d & 3d shapes)', t => {
  const op1 = cube()
  const op2 = square([10, 2])

  const obs = union(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})

test('difference (defaults)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = cube({size: [1, 1, 10]})

  const obs = difference(op1, op2)

  t.deepEqual(obs.polygons.length, 10)
})

test('difference (more than 2 operands)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = cube({size: [1, 1, 10]})
  const op3 = cube({size: [3, 3, 10]})

  const obs = difference(op1, op2, op3)

  t.deepEqual(obs.polygons.length, 10)
})

test('difference (2d & 3d shapes)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = square([10, 2])

  const obs = difference(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})

test('intersection (defaults)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = cube({size: [1, 1, 10]})

  const obs = difference(op1, op2)

  t.deepEqual(obs.polygons.length, 10)
})

test('intersection (more than 2 operands)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = cube({size: [1, 1, 10]})
  const op3 = cube({size: [3, 3, 10]})

  const obs = intersection(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})

test('intersection (2d & 3d shapes)', t => {
  const op1 = cube({size: [10, 10, 1]})
  const op2 = cube({size: [1, 1, 10]})

  const obs = intersection(op1, op2)

  t.deepEqual(obs.polygons.length, 6)
})
