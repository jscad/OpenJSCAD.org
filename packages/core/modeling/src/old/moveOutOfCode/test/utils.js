import test from 'ava'
import {CSG, CAG, isCAG, isCSG} from '../csg'

test('isCSG() is correctly determining if object is a CSG', t => {
  const emptyCSG = new CSG()
  t.is(isCSG(emptyCSG), true)
})

test('isCAG() is correctly determining if object is a CAG', t => {
  const emptyCAG = new CAG()
  t.is(isCAG(emptyCAG), true)
})
