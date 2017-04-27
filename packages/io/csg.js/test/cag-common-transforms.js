import test from 'ava'
import { CAG } from '../csg'

// helper function, gives a much more compact variant of the the side data
// hint : this could also be used to streamline the cag implementation in the future
function compactCagSide (cagSide) {
  return {pos: [
      [cagSide.vertex0.pos._x, cagSide.vertex0.pos._y],
      [cagSide.vertex1.pos._x, cagSide.vertex1.pos._y]
  ]}
}

//
// Test suite for CAG Common Transformations
//
test('CAG should union properly', t => {
  const op1 = CAG.circle({resolution: 5})
  const op2 = CAG.rectangle({center: [1, 1]})

  const result = op1.union(op2)
  const firstSide = result.sides[0]
  const lastSide = result.sides[result.sides.length - 1]

  t.deepEqual(result.sides.length, 8)
  t.deepEqual(compactCagSide(firstSide), {pos: [[2, 0], [2, 2]]})
  t.deepEqual(compactCagSide(lastSide), {pos: [[0, 0.8506508083520399], [-0.8090169943749475, 0.5877852522924732]]})
// conversion functions
// assert.equal(cag.toString(), 'CAG (0 sides):\n')
// assert.equal(area, 0)
// assert.typeOf(bounds, 'array')
// assert.lengthOf(bounds, 2)
// assert.typeOf(bounds[0], 'object')
// assert.typeOf(bounds[1], 'object')
})

test('CAG should subtract properly', t => {
  const op1 = CAG.circle({resolution: 5})
  const op2 = CAG.rectangle({radius: 3})

  const result = op2.subtract(op1)
  const firstSide = result.sides[0]
  const lastSide = result.sides[result.sides.length - 1]

  t.deepEqual(result.sides.length, 9)
  t.deepEqual(compactCagSide(firstSide), {pos: [[-3, 3], [-3, -3]]})
  t.deepEqual(compactCagSide(lastSide), {pos: [[1, 0], [0.30901699437494723, -0.9510565162951536]]})
})

test('CAG should intersect properly', t => {
  const op1 = CAG.circle({resolution: 5})
  const op2 = CAG.rectangle({radius: 3})

  const result = op2.intersect(op1)
  const firstSide = result.sides[0]
  const lastSide = result.sides[result.sides.length - 1]

  t.deepEqual(result.sides.length, 5)
  t.deepEqual(compactCagSide(firstSide), {pos: [[1, 0], [0.30901699437494745, 0.9510565162951535]]})
  t.deepEqual(compactCagSide(lastSide), {pos: [[0.30901699437494723, -0.9510565162951536], [1, 0]]})
})

test.todo('CAG should transform properly');
test.todo('CAG should flip properly');
test.todo('CAG should expand properly');
test.todo('CAG should contract properly');
