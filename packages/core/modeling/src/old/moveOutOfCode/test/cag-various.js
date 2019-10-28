const test = require('ava')
const {CAG, CSG} = require('../csg')

// helper function, gives a much more compact variant of the the side data
// hint : this could also be used to streamline the cag implementation in the future
function compareCagSide (cagSide) {
  return {pos: [
      [cagSide.vertex0.pos._x, cagSide.vertex0.pos._y],
      [cagSide.vertex1.pos._x, cagSide.vertex1.pos._y]
  ]}
}

// FIXME change this to NOT use expand() as that function is full of bugs
// FIXME this test needs additional tests for multiple paths, i.e. holes, donuts, etc.
test('CAG getOutlinePaths should work correctly', t => {
  const radius = 10
  const cag = CAG.fromPoints([
    [-radius, -radius, 0],
    [radius, -radius, 0],
    [radius, radius, 0]
  ]).expand(2, CSG.defaultResolution2D)

  const result = cag.getOutlinePaths()

  t.deepEqual(cag.sides.length, 35)
  t.deepEqual(cag.isCanonicalized, true)
})

test.failing('CAG overCutInsideCorners should work correctly', t => {
// test CAG without inside corners
  const cag1 = CAG.rectangle({radius: [5, 3]})
  let res1 = cag1.overCutInsideCorners(1)

  // t.deepEqual(cag1, res1) // not possible due to tags
  t.deepEqual(compareCagSide(res1.sides[0]), {pos: [[-5, 3], [-5, -3]]})
  t.deepEqual(compareCagSide(res1.sides[1]), {pos: [[-5, -3], [5, -3]]})
  t.deepEqual(compareCagSide(res1.sides[2]), {pos: [[5, -3], [5, 3]]})
  t.deepEqual(compareCagSide(res1.sides[3]), {pos: [[5, 3], [-5, 3]]})

  const radius = 10
  const cag2 = CAG.fromPoints([
                               [radius, radius],
                               [radius, -radius],
                               [0, -radius],
                               [0, 0],
                               [-radius, 0],
                               [-radius, radius]
  ])
// console.log(cag2.toString())
  let res2 = cag2.overCutInsideCorners(1)
// console.log(res2.toString())
// FIXME order of sides is just WRONG!!!
  t.deepEqual(compareCagSide(res2.sides[0]), {pos: [[radius, radius], [radius, -radius]]})
  t.deepEqual(compareCagSide(res2.sides[1]), {pos: [[radius, -radius], [0, -radius]]})
// from this side, we expect the inside cut
  t.deepEqual(compareCagSide(res2.sides[2]), {pos: [[5, -3], [5, 3]]})
})
