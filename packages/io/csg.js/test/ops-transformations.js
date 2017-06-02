import test from 'ava'
import {CSG} from '../csg'

test('expand() CSG objects', t => {
  const observed = CSG.cube({center: [0, 0, 0], radius: [1, 1, 1]}).expand(0.2, 8)
  // const expected = ''
  t.deepEqual(observed.polygons.length, 94)
})


test('expand() CSG objects', t => {
  const observed = CSG.cube({center: [0, 0, 0], radius: [1, 1, 1]}).expand(0.2, 8)
  // const expected = ''
  t.deepEqual(observed.polygons.length, 94)
})
