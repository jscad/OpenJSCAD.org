const test = require('ava')

const { primitives } = require('@jscad/modeling')

const ensureManifoldness = require('./ensureManifoldness.js')

// NOTE : this test is BAD WAY, and too dependent on the current implementation , we need actual checks
// such as https://gamedev.stackexchange.com/questions/61878/how-check-if-an-arbitrary-given-mesh-is-a-single-closed-mesh
// https://stackoverflow.com/questions/761026/is-a-closed-polygonal-mesh-flipped
// https://blender.stackexchange.com/questions/20956/is-there-a-way-to-check-a-mesh-for-problems
// https://pypi.python.org/pypi/trimesh/2.2.8
test.failing('ensureManifoldness of geometry (single input)', (t) => {
  const input = primitives.cube()
  t.deepEqual(input.isRetesselated, false)

  const observed = ensureManifoldness(input)
  t.deepEqual(observed.isRetesselated, true)
})

test.failing('ensureManifoldness of geometry (array of inputs)', (t) => {
  const input = [
    primitives.cube(),
    primitives.sphere(),
    primitives.cube()
  ]
  input.map((x) => {
    t.deepEqual(x.isRetesselated, false)
  })
  const observed = ensureManifoldness(input)
  observed.map((x) => {
    t.deepEqual(x.isRetesselated, true)
  })
})
