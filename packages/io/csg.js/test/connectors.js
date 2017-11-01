import test from 'ava'
import {CSG} from '../csg'

test('CSG.Connector exists', t => {
  t.is('Connector' in CSG, true)
})

test('CSG.connectorslist can be instanciated', t => {
  const observed = new CSG.ConnectorList()

  t.deepEqual(observed, {connectors_: []})
})
