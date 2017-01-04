import test from 'ava'
import { cube } from './primitives3d'
import { square } from './primitives2d'
import { linear_extrude, rotate_extrude, rectangular_extrude } from './ops-booleans'

test('linear_extrude (defaults)', t => {
  const op1 = cube()

  const obs = linear_extrude(op1)

  t.deepEqual(obs.polygons.length, 6)
})


test('rotate_extrude (defaults)', t => {
  const op1 = cube()

  const obs = rotate_extrude(op1)

  t.deepEqual(obs.polygons.length, 6)
})

test('rectangular_extrude (defaults)', t => {
  const op1 = cube()

  const obs = rectangular_extrude(op1)

  t.deepEqual(obs.polygons.length, 6)
})
