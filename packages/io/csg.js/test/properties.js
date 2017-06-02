import test from 'ava'
import {CSG} from '../csg'


test('CSG.Properties exists', t => {
  t.is('Properties' in CSG, true)
})
