import test from 'ava'
import {CSG} from '../csg'


test('CSG.Connector exists', t => {
  t.is('Connector' in CSG, true)
})
