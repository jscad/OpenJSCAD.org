const {areaEPS} = require('../constants')
const {linesIntersect} = require('../math/lineUtils')

// check if we are a valid CAG (for debugging)
// NOTE(bebbi) uneven side count doesn't work because rounding with EPS isn't taken into account
const isCAGValid = function (CAG) {
  let errors = []
  if (CAG.isSelfIntersecting(true)) {
    errors.push('Self intersects')
  }
  let pointcount = {}
  CAG.sides.map(function (side) {
    function mappoint (p) {
      let tag = p.x + ' ' + p.y
      if (!(tag in pointcount)) pointcount[tag] = 0
      pointcount[tag] ++
    }
    mappoint(side.vertex0.pos)
    mappoint(side.vertex1.pos)
  })
  for (let tag in pointcount) {
    let count = pointcount[tag]
    if (count & 1) {
      errors.push('Uneven number of sides (' + count + ') for point ' + tag)
    }
  }
  let area = CAG.area()
  if (area < areaEPS) {
    errors.push('Area is ' + area)
  }
  if (errors.length > 0) {
    let ertxt = ''
    errors.map(function (err) {
      ertxt += err + '\n'
    })
    throw new Error(ertxt)
  }
}

const isSelfIntersecting = function (cag, debug) {
  let numsides = cag.sides.length
  for (let i = 0; i < numsides; i++) {
    let side0 = cag.sides[i]
    for (let ii = i + 1; ii < numsides; ii++) {
      let side1 = cag.sides[ii]
      if (linesIntersect(side0.vertex0.pos, side0.vertex1.pos, side1.vertex0.pos, side1.vertex1.pos)) {
        if (debug) { console.log('side ' + i + ': ' + side0); console.log('side ' + ii + ': ' + side1) }
        return true
      }
    }
  }
  return false
}

module.exports = {isCAGValid, isSelfIntersecting}
