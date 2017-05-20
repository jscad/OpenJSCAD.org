const test = require('ava')
const {CAG, CSG} = require('../csg')

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
